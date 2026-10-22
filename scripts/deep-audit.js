import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";

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
  "/faq",
  "/faq/why-npu-ai-enhancer-not-working",
  "/terms",
  "/privacy",
];

async function deepAudit() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const report = {};

  for (const route of ROUTES) {
    report[route] = { desktop: {}, mobile: {} };

    // 1. Desktop
    {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const page = await context.newPage();
      await page.goto(`http://localhost:4321${route}`, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(300);

      const desktopCheck = await page.evaluate(() => {
        // Horizontal overflow
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
        const overflow = scrollWidth > docWidth || bodyScrollWidth > docWidth;

        // Decorative numbers
        const decorativeNumbers = [];
        const textElements = document.querySelectorAll("*");
        textElements.forEach((el) => {
          if (el.children.length === 0) {
            const txt = (el.textContent || "").trim();
            // match 01, 02, 03, #01, #02, Q01, Q02
            if (
              /^#?0\d$/.test(txt) ||
              /^Q0\d$/i.test(txt) ||
              /^\d{2}\s*·/.test(txt)
            ) {
              decorativeNumbers.push({
                text: txt,
                tag: el.tagName.toLowerCase(),
                cls: el.className || "",
                parentCls: el.parentElement?.className || "",
              });
            }
          }
        });

        // Pill badges / chips
        const pillBadges = [];
        textElements.forEach((el) => {
          if (el.closest('[aria-label="Development page notice"]')) return;
          const cls = typeof el.className === "string" ? el.className : "";
          const txt = (el.textContent || "").trim();
          const isPill =
            cls.includes("rounded-full") &&
            !["BUTTON", "A", "INPUT"].includes(el.tagName);
          const hasPillBadgeLook =
            (cls.includes("rounded-full") &&
              cls.includes("border") &&
              txt.length > 0 &&
              txt.length < 35 &&
              el.clientHeight <= 36) ||
            cls.includes("faq-cat-btn") ||
            cls.includes("catalog-filter-btn") ||
            (cls.includes("rounded-chip") &&
              !cls.includes("mobile-nav-link")) ||
            cls.includes("rounded-note");
          if (hasPillBadgeLook) {
            pillBadges.push({
              tag: el.tagName.toLowerCase(),
              text: txt.slice(0, 40),
              cls: cls.slice(0, 100),
              isButton: ["BUTTON", "A"].includes(el.tagName),
            });
          }
        });

        // Nested boxes (Box-in-Box)
        // Rule: Bordered/raised container must never contain another bordered card or boxed callout inside it.
        const nestedBoxes = [];
        const candidateContainers = document.querySelectorAll(
          "section, div, article, aside",
        );
        candidateContainers.forEach((container) => {
          if (container.closest("header, nav, footer, #mobile-menu")) return;
          const style = window.getComputedStyle(container);
          const hasBorder =
            parseFloat(style.borderWidth) >= 1 &&
            style.borderStyle !== "none" &&
            !style.borderColor.includes("rgba(0, 0, 0, 0)");
          const isRaised =
            style.backgroundColor &&
            (style.backgroundColor.includes("34, 34, 34") ||
              style.backgroundColor.includes("42, 42, 42") ||
              style.backgroundColor.includes("26, 26, 26"));
          const hasRadius = parseFloat(style.borderRadius) >= 8;

          if (
            (hasBorder || isRaised) &&
            hasRadius &&
            container.clientWidth > 120 &&
            container.clientHeight > 80
          ) {
            // Check for inner bordered boxes inside this container
            const innerCards = Array.from(
              container.querySelectorAll("div, article, aside, li"),
            ).filter((inner) => {
              if (inner === container) return false;
              if (inner.closest("header, nav, button, a")) return false;
              const iStyle = window.getComputedStyle(inner);
              const iBorder =
                parseFloat(iStyle.borderWidth) >= 1 &&
                iStyle.borderStyle !== "none" &&
                !iStyle.borderColor.includes("rgba(0, 0, 0, 0)");
              const iRadius = parseFloat(iStyle.borderRadius) >= 6;
              const iBg =
                iStyle.backgroundColor &&
                iStyle.backgroundColor !== "transparent" &&
                iStyle.backgroundColor !== "rgba(0, 0, 0, 0)" &&
                !iStyle.backgroundColor.includes("rgba(255, 255, 255, 0.0");
              return (
                iBorder &&
                iRadius &&
                inner.clientWidth > 80 &&
                inner.clientHeight > 40
              );
            });

            if (innerCards.length > 0) {
              nestedBoxes.push({
                container: {
                  tag: container.tagName.toLowerCase(),
                  cls: (container.className || "").slice(0, 80),
                },
                innerCount: innerCards.length,
                samples: innerCards.slice(0, 2).map((ic) => ({
                  tag: ic.tagName.toLowerCase(),
                  cls: (ic.className || "").slice(0, 80),
                  text: (ic.textContent || "").trim().slice(0, 30),
                })),
              });
            }
          }
        });

        // Eyebrows / Kickers above headings
        const eyebrows = [];
        const allHeadings = document.querySelectorAll("h1, h2, h3");
        allHeadings.forEach((h) => {
          const prev = h.previousElementSibling;
          if (prev) {
            const cls = prev.className || "";
            const txt = (prev.textContent || "").trim();
            if (
              cls.includes("text-eyebrow") ||
              (cls.includes("text-micro") && cls.includes("uppercase")) ||
              (cls.includes("mono-spec") && cls.includes("uppercase"))
            ) {
              eyebrows.push({
                heading: h.textContent.trim().slice(0, 40),
                eyebrowText: txt.slice(0, 40),
                cls: cls.slice(0, 80),
              });
            }
          }
        });

        // Centering / max-width on editorial pages
        const isEditorial =
          window.location.pathname.startsWith("/faq");
        let editorialLayout = null;
        if (isEditorial) {
          const main = document.querySelector("main");
          const maxWEls = document.querySelectorAll(
            ".max-w-\\[760px\\], .max-w-\\[840px\\], .max-w-\\[720px\\]",
          );
          editorialLayout = {
            mainFound: !!main,
            maxWCount: maxWEls.length,
            classes: Array.from(maxWEls).map((el) => el.className.slice(0, 60)),
          };
        }

        return {
          overflow,
          scrollWidth,
          docWidth,
          decorativeNumbers,
          pillBadges,
          nestedBoxes,
          eyebrows,
          editorialLayout,
        };
      });

      // Test focus-visible on interactive elements
      const focusTest = await page.evaluate(() => {
        const issues = [];
        const interactives = document.querySelectorAll(
          "a, button, input, summary",
        );
        interactives.forEach((el) => {
          if (el.offsetParent === null) return; // hidden
          el.focus();
          const style = window.getComputedStyle(el);
          const hasOutline =
            style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0;
          const hasShadow =
            style.boxShadow &&
            style.boxShadow !== "none" &&
            !style.boxShadow.includes("rgba(0, 0, 0, 0)");
          const text = (el.textContent || "").trim().slice(0, 30);
          const cls = typeof el.className === "string" ? el.className : "";
          if (!hasOutline && !hasShadow) {
            issues.push({
              tag: el.tagName.toLowerCase(),
              text: text || el.getAttribute("aria-label") || "unlabeled",
              cls: cls.slice(0, 80),
            });
          }
        });
        return issues;
      });

      report[route].desktop = { ...desktopCheck, focusIssues: focusTest };
      await context.close();
    }

    // 2. Mobile
    {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
      });
      const page = await context.newPage();
      await page.goto(`http://localhost:4321${route}`, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(300);

      const mobileCheck = await page.evaluate(() => {
        // Horizontal overflow
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
        const overflow = scrollWidth > docWidth || bodyScrollWidth > docWidth;

        // Touch targets < 44x44
        const touchIssues = [];
        const interactives = document.querySelectorAll(
          "a, button, input, select, textarea, summary",
        );
        interactives.forEach((el) => {
          if (el.offsetParent === null) return;
          // Ignore sr-only links
          const cls = typeof el.className === "string" ? el.className : "";
          if (cls.includes("sr-only")) return;

          const rect = el.getBoundingClientRect();
          if (
            rect.width > 0 &&
            rect.height > 0 &&
            (rect.width < 44 || rect.height < 44)
          ) {
            touchIssues.push({
              tag: el.tagName.toLowerCase(),
              text:
                (el.textContent || "").trim().slice(0, 30) ||
                el.getAttribute("aria-label") ||
                "unlabeled",
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              cls: cls.slice(0, 80),
            });
          }
        });

        return {
          overflow,
          scrollWidth,
          docWidth,
          touchIssues,
        };
      });

      report[route].mobile = mobileCheck;
      await context.close();
    }
  }

  await browser.close();

  fs.writeFileSync(
    "screenshots/audit-2026-10-13/deep-audit-report.json",
    JSON.stringify(report, null, 2),
  );
  console.log("Deep audit completed!");
}

deepAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
