import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROUTES = [
  "/",
  "/features",
  "/features/catalog",
  "/features/usb-dac",
  "/features/eq",
  "/features/library",
  "/features/casting",
  "/features/dsp",
  "/features/ai-enhancer",
  "/changelog",
  "/changelog/1.2.0",
  "/changelog/1.0.6",
  "/faq",
  "/faq/why-npu-ai-enhancer-not-working",
  "/terms",
  "/privacy",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const OUTPUT_DIR = path.resolve(process.cwd(), "screenshots/audit-2026-10-13");

function routeToSlug(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/\//g, "-");
}

async function runAudit() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const auditResults = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = `http://localhost:4321${route}`;
      const slug = routeToSlug(route);
      const screenshotFilename = `${slug}-${vp.name}.png`;
      const screenshotPath = path.join(OUTPUT_DIR, screenshotFilename);

      console.log(
        `Auditing ${route} on ${vp.name} (${vp.width}x${vp.height})...`,
      );

      let response;
      try {
        response = await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 15000,
        });
      } catch (e) {
        try {
          response = await page.goto(url, {
            waitUntil: "load",
            timeout: 15000,
          });
        } catch (err) {
          console.error(`Failed to load ${url}:`, err);
          continue;
        }
      }

      await page.waitForTimeout(300);

      // Take full page screenshot
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Run automated DOM inspection on this page
      const pageInspection = await page.evaluate((viewportInfo) => {
        const defects = [];

        // 1. Horizontal overflow
        const docWidth = document.documentElement.clientWidth;
        const scrollWidthDoc = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
        const hasOverflow =
          scrollWidthDoc > docWidth || bodyScrollWidth > docWidth;

        const overflowingElements = [];
        if (hasOverflow) {
          const allEls = document.querySelectorAll("*");
          allEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 2 || rect.left < -2) {
              overflowingElements.push({
                tag: el.tagName.toLowerCase(),
                className:
                  el.className && typeof el.className === "string"
                    ? el.className.slice(0, 100)
                    : "",
                id: el.id || "",
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              });
            }
          });
        }

        // 2. Chips / pill badges
        // Check for rounded-full elements with badges, tags, or small status chips
        const pillElements = [];
        const allNodes = document.querySelectorAll("*");
        allNodes.forEach((el) => {
          const style = window.getComputedStyle(el);
          const cls =
            el.className && typeof el.className === "string"
              ? el.className
              : "";
          const isButtonOrInput = ["BUTTON", "INPUT", "A"].includes(el.tagName);
          const hasRoundedFull =
            cls.includes("rounded-full") || style.borderRadius === "9999px";

          // Exclude regular buttons or icons unless they look like pills / tags / status badges
          const text = (el.textContent || "").trim();
          const isTagOrBadge =
            cls.includes("badge") ||
            cls.includes("chip") ||
            cls.includes("tag") ||
            (hasRoundedFull &&
              text.length > 0 &&
              text.length < 35 &&
              el.clientHeight <= 36 &&
              !el.querySelector("svg:only-child")) ||
            cls.includes("faq-cat-btn") ||
            cls.includes("catalog-filter-btn");

          // DevOnlyBadge is dev-only so note it
          if (
            cls.includes("DevOnlyBadge") ||
            el.closest('[aria-label="Development page notice"]')
          ) {
            return;
          }

          if (isTagOrBadge) {
            pillElements.push({
              tag: el.tagName.toLowerCase(),
              cls: cls.slice(0, 100),
              text: text.slice(0, 50),
              isInteractive: isButtonOrInput,
            });
          }
        });

        // 3. Decorative numbering (e.g. #01, 01, 02)
        const decorativeNumbers = [];
        allNodes.forEach((el) => {
          // Check leaf or shallow text nodes
          if (
            el.children.length === 0 ||
            (el.children.length === 1 && !el.children[0].textContent.trim())
          ) {
            const txt = (el.textContent || "").trim();
            if (/^#?0\d$/.test(txt) || /^#\d{1,2}$/.test(txt)) {
              decorativeNumbers.push({
                tag: el.tagName.toLowerCase(),
                cls:
                  el.className && typeof el.className === "string"
                    ? el.className.slice(0, 100)
                    : "",
                text: txt,
                parentTag: el.parentElement
                  ? el.parentElement.tagName.toLowerCase()
                  : "",
              });
            }
          }
        });

        // 4. Nested boxes (box-in-box-in-box)
        // A bordered or raised container containing another bordered card or boxed callout
        const nestedBoxes = [];
        function isBox(el) {
          const style = window.getComputedStyle(el);
          const hasBorder =
            style.borderWidth &&
            parseFloat(style.borderWidth) > 0 &&
            style.borderStyle !== "none" &&
            style.borderColor !== "transparent" &&
            !style.borderColor.includes("rgba(0, 0, 0, 0)");
          const hasBg =
            style.backgroundColor &&
            style.backgroundColor !== "transparent" &&
            style.backgroundColor !== "rgba(0, 0, 0, 0)";
          const hasRadius = parseFloat(style.borderRadius) >= 8;
          return (
            (hasBorder && hasRadius) ||
            (hasBg &&
              hasRadius &&
              ["article", "section", "div", "aside"].includes(
                el.tagName.toLowerCase(),
              ))
          );
        }

        const boxes = Array.from(
          document.querySelectorAll("div, section, article, aside, li"),
        ).filter((el) => {
          const cls =
            el.className && typeof el.className === "string"
              ? el.className
              : "";
          // filter out header, menu, buttons, dialogs
          if (el.closest('header, nav, #mobile-menu, [role="dialog"], button'))
            return false;
          const style = window.getComputedStyle(el);
          const hasBorder =
            parseFloat(style.borderWidth) >= 1 &&
            style.borderStyle !== "none" &&
            !style.borderColor.includes("rgba(0, 0, 0, 0)");
          const hasRadius = parseFloat(style.borderRadius) >= 8;
          return (
            hasBorder &&
            hasRadius &&
            el.clientWidth > 100 &&
            el.clientHeight > 50
          );
        });

        boxes.forEach((outer) => {
          const innerBoxes = Array.from(
            outer.querySelectorAll("div, section, article, aside, li"),
          ).filter((inner) => {
            if (inner === outer) return false;
            const style = window.getComputedStyle(inner);
            const hasBorder =
              parseFloat(style.borderWidth) >= 1 &&
              style.borderStyle !== "none" &&
              !style.borderColor.includes("rgba(0, 0, 0, 0)");
            const hasRadius = parseFloat(style.borderRadius) >= 6;
            return (
              hasBorder &&
              hasRadius &&
              inner.clientWidth > 60 &&
              inner.clientHeight > 30
            );
          });

          if (innerBoxes.length > 0) {
            nestedBoxes.push({
              outer: {
                tag: outer.tagName.toLowerCase(),
                cls:
                  outer.className && typeof outer.className === "string"
                    ? outer.className.slice(0, 80)
                    : "",
              },
              innerCount: innerBoxes.length,
              inners: innerBoxes.slice(0, 3).map((ib) => ({
                tag: ib.tagName.toLowerCase(),
                cls:
                  ib.className && typeof ib.className === "string"
                    ? ib.className.slice(0, 80)
                    : "",
                text: (ib.textContent || "").trim().slice(0, 40),
              })),
            });
          }
        });

        // 5. Button hover lift (check if any button or anchor has translateY or translate on hover or style)
        // We can inspect computed styles or classes
        const hoverLiftIssues = [];
        const buttonsAndLinks = document.querySelectorAll(
          'button, a.btn-primary-gradient, a.btn-secondary-glow, [role="button"]',
        );
        buttonsAndLinks.forEach((b) => {
          const cls =
            b.className && typeof b.className === "string" ? b.className : "";
          if (
            cls.includes("hover:-translate") ||
            cls.includes("hover:translate") ||
            cls.includes("active:translate-y")
          ) {
            hoverLiftIssues.push({
              tag: b.tagName.toLowerCase(),
              cls: cls.slice(0, 100),
              text: (b.textContent || "").trim().slice(0, 40),
            });
          }
        });

        // 6. Touch targets < 44x44px on mobile
        const touchTargetIssues = [];
        if (viewportInfo.name === "mobile") {
          const interactive = document.querySelectorAll(
            'button, a, input, select, textarea, [role="button"]',
          );
          interactive.forEach((el) => {
            if (el.offsetParent === null) return; // hidden
            const rect = el.getBoundingClientRect();
            if (
              rect.width > 0 &&
              rect.height > 0 &&
              (rect.width < 44 || rect.height < 44)
            ) {
              // check if it has a small size
              const text = (el.textContent || "").trim().slice(0, 30);
              const cls =
                el.className && typeof el.className === "string"
                  ? el.className.slice(0, 80)
                  : "";
              touchTargetIssues.push({
                tag: el.tagName.toLowerCase(),
                text: text || el.getAttribute("aria-label") || "icon/empty",
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                cls,
              });
            }
          });
        }

        // 7. Focus visible indicator
        const focusRingIssues = [];
        const interactives = document.querySelectorAll(
          "button, a, input, select",
        );
        interactives.forEach((el) => {
          const cls =
            el.className && typeof el.className === "string"
              ? el.className
              : "";
          const hasFocusClass =
            cls.includes("focus-visible:focus-ring") ||
            cls.includes("focus-visible:outline") ||
            cls.includes("focus:");
          // Check computed outline/shadow
          if (!hasFocusClass && !cls.includes("focus-ring")) {
            focusRingIssues.push({
              tag: el.tagName.toLowerCase(),
              cls: cls.slice(0, 80),
              text: (el.textContent || "").trim().slice(0, 30),
            });
          }
        });

        // 8. Editorial centering / max-w check
        const editorialIssues = [];
        const isEditorial =
          window.location.pathname.startsWith("/changelog") ||
          window.location.pathname.startsWith("/faq");
        if (isEditorial) {
          const main = document.querySelector("main");
          if (main) {
            const containers = main.querySelectorAll(
              ".max-w-\\[760px\\], .max-w-\\[840px\\], .max-w-2xl, .max-w-3xl, .max-w-4xl",
            );
            editorialIssues.push({
              pathname: window.location.pathname,
              containerCount: containers.length,
              mainCls: main.className.slice(0, 100),
            });
          }
        }

        // 9. Text contrast violations
        // Sample text elements across page
        const contrastIssues = [];
        function parseRgb(colorStr) {
          const match = colorStr.match(
            /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
          );
          if (!match) return null;
          return {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
            a: match[4] !== undefined ? parseFloat(match[4]) : 1,
          };
        }

        function getLuminance(r, g, b) {
          const [rs, gs, bs] = [r, g, b].map((c) => {
            c = c / 255;
            return c <= 0.03928
              ? c / 12.92
              : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        }

        function getContrast(fg, bg) {
          const l1 = getLuminance(fg.r, fg.g, fg.b);
          const l2 = getLuminance(bg.r, bg.g, bg.b);
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        // Traverse visible text elements
        const textNodes = document.querySelectorAll(
          "p, h1, h2, h3, h4, span, li, a",
        );
        textNodes.forEach((el) => {
          if (el.offsetParent === null) return;
          const text = (el.textContent || "").trim();
          if (!text || text.length < 3 || el.children.length > 2) return;

          const style = window.getComputedStyle(el);
          const fg = parseRgb(style.color);
          if (!fg || fg.a === 0) return;

          // Find background color by bubbling up
          let curr = el;
          let bg = null;
          while (curr && curr !== document.documentElement) {
            const cStyle = window.getComputedStyle(curr);
            const b = parseRgb(cStyle.backgroundColor);
            if (b && b.a > 0.8) {
              bg = b;
              break;
            }
            curr = curr.parentElement;
          }
          if (!bg) bg = { r: 25, g: 25, b: 25, a: 1 }; // default dark surface

          const ratio = getContrast(fg, bg);
          const fontSize = parseFloat(style.fontSize);
          const isBold = parseInt(style.fontWeight) >= 700;
          const isLarge = fontSize >= 24 || (fontSize >= 18.66 && isBold);
          const threshold = isLarge ? 3.0 : 4.5;

          if (ratio < threshold && ratio > 1.05) {
            contrastIssues.push({
              tag: el.tagName.toLowerCase(),
              text: text.slice(0, 35),
              ratio: Math.round(ratio * 100) / 100,
              threshold,
              color: style.color,
              bgColor: `rgb(${bg.r},${bg.g},${bg.b})`,
              cls:
                el.className && typeof el.className === "string"
                  ? el.className.slice(0, 80)
                  : "",
            });
          }
        });

        return {
          hasOverflow,
          scrollWidthDoc,
          docWidth,
          overflowingElements: overflowingElements.slice(0, 10),
          pillElements: pillElements.slice(0, 15),
          decorativeNumbers,
          nestedBoxes: nestedBoxes.slice(0, 10),
          hoverLiftIssues,
          touchTargetIssues: touchTargetIssues.slice(0, 20),
          focusRingIssues: focusRingIssues.slice(0, 20),
          contrastIssues: contrastIssues.slice(0, 15),
          editorialIssues,
        };
      }, vp);

      auditResults.push({
        route,
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        screenshot: screenshotFilename,
        inspection: pageInspection,
      });
    }

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "audit-results.json"),
    JSON.stringify(auditResults, null, 2),
  );

  console.log("Audit complete! Results saved.");
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
