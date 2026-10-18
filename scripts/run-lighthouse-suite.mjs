import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";

const execFileAsync = promisify(execFile);

const CHROME_PATH =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE_URL = process.env.BASE_URL || "http://localhost:4322";
const OUTPUT_DIR = path.resolve(".lh-reports");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const ROUTES = [
  { id: "home", path: "/", name: "Home" },
  { id: "features", path: "/features", name: "Features Index" },
  {
    id: "features-usb-dac",
    path: "/features/usb-dac",
    name: "Feature Detail (USB DAC)",
  },
  { id: "privacy", path: "/privacy", name: "Legal (Privacy)" },
];

const CONFIGS = [
  { id: "desktop", name: "Desktop", flags: ["--preset=desktop"] },
  { id: "mobile", name: "Mobile", flags: [] },
];

async function checkServer() {
  try {
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    console.log(`✓ Target server is responding at ${BASE_URL}`);
  } catch (err) {
    console.error(
      `✗ Target server is NOT reachable at ${BASE_URL}:`,
      err.message,
    );
    process.exit(1);
  }
}

async function runAudit(route, config) {
  const url = `${BASE_URL}${route.path}`;
  const outFileName = `${route.id}-${config.id}.json`;
  const outFilePath = path.join(OUTPUT_DIR, outFileName);

  const args = [
    "-y",
    "lighthouse",
    url,
    "--chrome-flags=--headless=new --no-sandbox",
    "--only-categories=performance,accessibility,best-practices,seo",
    "--output=json",
    `--output-path=${outFilePath}`,
    "--quiet",
    ...config.flags,
  ];

  console.log(`\n======================================================`);
  console.log(`Running audit: ${route.name} [${config.name}]`);
  console.log(`URL: ${url}`);
  console.log(`Command: npx ${args.join(" ")}`);
  console.log(`======================================================`);

  const startTime = Date.now();
  try {
    await execFileAsync("npx", args, {
      env: {
        ...process.env,
        CHROME_PATH,
      },
      maxBuffer: 50 * 1024 * 1024,
    });
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✓ Completed in ${duration}s -> saved to ${outFileName}`);
  } catch (err) {
    console.error(
      `✗ Error running lighthouse for ${route.name} (${config.name}):`,
      err.message,
    );
    throw err;
  }

  const rawJson = fs.readFileSync(outFilePath, "utf8");
  return JSON.parse(rawJson);
}

function extractAuditIssues(report) {
  const categories = report.categories;
  const audits = report.audits;

  const result = {
    scores: {},
    issuesByCategory: {},
  };

  for (const [catKey, cat] of Object.entries(categories)) {
    const scoreVal =
      typeof cat.score === "number" ? Math.round(cat.score * 100) : 0;
    result.scores[catKey] = {
      id: cat.id,
      title: cat.title,
      score: scoreVal,
    };

    const issues = [];

    for (const auditRef of cat.auditRefs) {
      const audit = audits[auditRef.id];
      if (!audit) continue;

      const isNonPassingScore =
        typeof audit.score === "number" && audit.score < 1;
      const isError = audit.scoreDisplayMode === "error";
      const hasWarnings =
        Array.isArray(audit.warnings) && audit.warnings.length > 0;
      const isInformativeWithOpportunity =
        audit.details &&
        (audit.details.type === "opportunity" ||
          audit.details.type === "table") &&
        ((audit.details.overallSavingsMs &&
          audit.details.overallSavingsMs > 0) ||
          (audit.details.overallSavingsBytes &&
            audit.details.overallSavingsBytes > 0));

      // Exclude notApplicable and informative audits that have no issues and score === null
      if (audit.scoreDisplayMode === "notApplicable") continue;
      if (audit.scoreDisplayMode === "manual") continue;

      if (
        isNonPassingScore ||
        isError ||
        hasWarnings ||
        isInformativeWithOpportunity
      ) {
        // Extract failing items / details
        let itemsDetails = [];
        if (audit.details && Array.isArray(audit.details.items)) {
          itemsDetails = audit.details.items.map((item) => {
            const cleanItem = {};
            if (item.node) {
              cleanItem.node = {
                snippet: item.node.snippet,
                selector: item.node.selector,
                nodeLabel: item.node.nodeLabel,
                explanation: item.node.explanation,
              };
            }
            if (item.url) cleanItem.url = item.url;
            if (item.source) cleanItem.source = item.source;
            if (item.reflowTime !== undefined)
              cleanItem.reflowTime = `${item.reflowTime.toFixed(1)}ms`;
            if (item.wastedBytes !== undefined)
              cleanItem.wastedBytes = `${(item.wastedBytes / 1024).toFixed(1)} KiB`;
            if (item.totalBytes !== undefined)
              cleanItem.totalBytes = `${(item.totalBytes / 1024).toFixed(1)} KiB`;
            if (item.wastedMs !== undefined)
              cleanItem.wastedMs = `${item.wastedMs.toFixed(0)}ms`;
            if (item.subItems && Array.isArray(item.subItems.items)) {
              cleanItem.subReasons = item.subItems.items
                .map((s) => s.reason)
                .filter(Boolean);
            }
            if (item.items && Array.isArray(item.items)) {
              cleanItem.subItems = item.items.slice(0, 3);
            }
            if (Object.keys(cleanItem).length === 0) {
              // Fallback to a simplified object
              for (const [k, v] of Object.entries(item)) {
                if (
                  typeof v === "string" ||
                  typeof v === "number" ||
                  typeof v === "boolean"
                ) {
                  cleanItem[k] = v;
                }
              }
            }
            return cleanItem;
          });
        }

        issues.push({
          auditId: audit.id,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          scoreDisplayMode: audit.scoreDisplayMode,
          displayValue: audit.displayValue,
          warnings: audit.warnings || [],
          itemsCount: itemsDetails.length,
          items: itemsDetails,
        });
      }
    }

    result.issuesByCategory[catKey] = issues;
  }

  return result;
}

async function main() {
  await checkServer();

  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    runs: [],
  };

  for (const route of ROUTES) {
    for (const config of CONFIGS) {
      try {
        const report = await runAudit(route, config);
        const analysis = extractAuditIssues(report);

        const runRecord = {
          routeId: route.id,
          routeName: route.name,
          routePath: route.path,
          device: config.id,
          deviceName: config.name,
          reportFile: `.lh-reports/${route.id}-${config.id}.json`,
          scores: analysis.scores,
          issuesByCategory: analysis.issuesByCategory,
        };

        summary.runs.push(runRecord);

        // Immediate console output for this run
        console.log(`\n--- SCORES: ${route.name} (${config.name}) ---`);
        for (const [catKey, scoreObj] of Object.entries(analysis.scores)) {
          const badge =
            scoreObj.score === 100 ? "✓ 100" : `⚠️  ${scoreObj.score}`;
          console.log(`  ${scoreObj.title.padEnd(16)}: ${badge}`);
        }

        // Check if any category < 100 or has issues
        let totalIssues = 0;
        for (const [catKey, issues] of Object.entries(
          analysis.issuesByCategory,
        )) {
          totalIssues += issues.length;
          if (analysis.scores[catKey].score < 100 || issues.length > 0) {
            console.log(
              `\n  Issues in [${analysis.scores[catKey].title}] (Score: ${analysis.scores[catKey].score}):`,
            );
            if (issues.length === 0) {
              console.log(
                `    (Score deducted by metric distributions without specific failing audit flags)`,
              );
            }
            for (const issue of issues) {
              console.log(
                `    • [${issue.auditId}] "${issue.title}" (Score: ${issue.score}, ${issue.displayValue || "N/A"})`,
              );
              console.log(
                `      Description: ${issue.description.split("\n")[0]}`,
              );
              if (issue.warnings && issue.warnings.length > 0) {
                console.log(
                  `      Warnings: ${JSON.stringify(issue.warnings)}`,
                );
              }
              if (issue.items && issue.items.length > 0) {
                console.log(`      Failing items (${issue.items.length}):`);
                for (const item of issue.items.slice(0, 5)) {
                  console.log(`        - ${JSON.stringify(item)}`);
                }
                if (issue.items.length > 5) {
                  console.log(
                    `        ... and ${issue.items.length - 5} more items`,
                  );
                }
              }
            }
          }
        }
        if (totalIssues === 0) {
          console.log(
            `  🎉 Perfect run! No failing audits, warnings, or opportunities.`,
          );
        }
      } catch (err) {
        console.error(`Audit failed for ${route.id}-${config.id}:`, err);
      }
    }
  }

  // Save summary JSON
  const summaryPath = path.join(OUTPUT_DIR, "summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");
  console.log(`\n\n======================================================`);
  console.log(`All audits completed! Summary saved to ${summaryPath}`);
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error("Fatal error in audit suite:", err);
  process.exit(1);
});
