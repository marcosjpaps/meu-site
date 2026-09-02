import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const url =
  "https://www.google.com/maps/place/Guincho+Auto+Socorro+Rocha/@-17.7298807,-46.1670691,17z/data=!3m1!4b1!4m6!3m5!1s0x94abe37d5747554f:0xcfc8170127abbc59!8m2!3d-17.7298807!4d-46.1670691";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: "pt-BR",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
});
const page = await context.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(6000);

for (const label of ["Aceitar tudo", "Accept all", "I agree", "Concordo"]) {
  const btn = page.getByRole("button", { name: new RegExp(label, "i") });
  try {
    if ((await btn.count()) > 0 && (await btn.first().isVisible())) {
      await btn.first().click();
      await page.waitForTimeout(2500);
      break;
    }
  } catch {}
}

await page.screenshot({ path: "/tmp/maps-listing.png" });
console.log("TITLE", await page.title());

const srcs = await page.$$eval("img", (els) =>
  els.map((e) => ({
    src: e.src,
    alt: e.alt,
    w: e.naturalWidth,
    h: e.naturalHeight,
  })),
);
console.log("IMG COUNT", srcs.length);
for (const s of srcs) {
  if (s.w > 80) console.log(s.w, s.h, (s.alt || "").slice(0, 50), (s.src || "").slice(0, 180));
}

// Click the cover photo or Fotos
for (const name of ["Fotos", "Photos", "Ver fotos"]) {
  const loc = page.getByRole("button", { name: new RegExp(name, "i") });
  try {
    const n = await loc.count();
    if (n) {
      console.log("button", name, n);
      await loc.first().click({ timeout: 4000 });
      await page.waitForTimeout(3500);
      break;
    }
  } catch (e) {
    console.log("btn fail", name, String(e).slice(0, 80));
  }
}
for (const name of ["Fotos", "Photos"]) {
  const loc = page.getByRole("tab", { name: new RegExp(name, "i") });
  try {
    const n = await loc.count();
    if (n) {
      console.log("tab", name, n);
      await loc.first().click({ timeout: 4000 });
      await page.waitForTimeout(3500);
      break;
    }
  } catch {}
}

// click first large image
try {
  await page.locator('button[aria-label*="Foto"], button[aria-label*="Photo"], img[src*="googleusercontent"]').first().click({ timeout: 4000 });
  await page.waitForTimeout(2500);
} catch (e) {
  console.log("img click fail", String(e).slice(0, 120));
}

await page.screenshot({ path: "/tmp/maps-photos.png" });
const srcs2 = await page.$$eval("img", (els) =>
  els.map((e) => ({
    src: e.src,
    alt: e.alt,
    w: e.naturalWidth,
    h: e.naturalHeight,
  })),
);
console.log("IMG COUNT AFTER", srcs2.length);
const guc = [];
for (const s of srcs2) {
  if ((s.src || "").includes("googleusercontent.com") && s.w >= 120) {
    console.log("PHOTO", s.w, s.h, (s.alt || "").slice(0, 40), s.src.slice(0, 200));
    guc.push(s.src);
  }
}
const html = await page.content();
const fromHtml = [...html.matchAll(/https:\/\/[^"'\\\s]*googleusercontent\.com\/[^"'\\\s]+/g)].map((m) => m[0]);
console.log("FROM HTML", fromHtml.length);
for (const u of [...new Set(fromHtml)].slice(0, 40)) console.log(u.slice(0, 220));
writeFileSync("/tmp/maps-urls.txt", [...new Set([...guc, ...fromHtml])].join("\n"));
await browser.close();
console.log("done");
