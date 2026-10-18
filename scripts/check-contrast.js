import { chromium } from "playwright-core";

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

async function checkContrast() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = {};

  for (const route of ROUTES) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    });
    await page.goto(`http://localhost:4321${route}`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(300);

    const issues = await page.evaluate(() => {
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
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
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

      const lowContrast = [];
      const textEls = document.querySelectorAll(
        "p, h1, h2, h3, h4, span, a, li, time, strong",
      );

      textEls.forEach((el) => {
        if (el.offsetParent === null) return;
        if (el.closest(".btn-primary-gradient")) return; // gold button gradient has high contrast ~10:1
        const txt = (el.textContent || "").trim();
        if (!txt || txt.length < 2 || el.children.length > 2) return;

        const style = window.getComputedStyle(el);
        const fg = parseRgb(style.color);
        if (!fg || fg.a < 0.3) return;

        // determine effective background
        let bg = null;
        let curr = el;
        while (curr && curr !== document.documentElement) {
          const cStyle = window.getComputedStyle(curr);
          const b = parseRgb(cStyle.backgroundColor);
          if (b && b.a > 0.85) {
            bg = b;
            break;
          }
          if (curr.classList.contains("bg-band-ivory")) {
            bg = { r: 255, g: 255, b: 255, a: 1 };
            break;
          }
          curr = curr.parentElement;
        }
        if (!bg) bg = { r: 25, g: 25, b: 25, a: 1 }; // default surface-base #191919

        const ratio = getContrast(fg, bg);
        const fontSize = parseFloat(style.fontSize);
        const isBold = parseInt(style.fontWeight) >= 700;
        const isLarge = fontSize >= 24 || (fontSize >= 18.66 && isBold);
        const threshold = isLarge ? 3.0 : 4.5;

        if (ratio < threshold) {
          lowContrast.push({
            tag: el.tagName.toLowerCase(),
            text: txt.slice(0, 35),
            ratio: Math.round(ratio * 100) / 100,
            threshold,
            color: style.color,
            bgColor: `rgb(${bg.r},${bg.g},${bg.b})`,
            cls:
              typeof el.className === "string" ? el.className.slice(0, 80) : "",
          });
        }
      });

      return lowContrast;
    });

    results[route] = issues;
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

checkContrast().catch(console.error);
