import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync(new URL("./home-opening-hero-demo.html", import.meta.url), "utf8");

const requiredFragments = [
  "home-opening",
  "opening-veil",
  "hero-logo-target",
  "animateOpening",
  "is-revealing",
  "prefers-reduced-motion",
  "DESIGN<br>TO BE<br>REMEMBERED",
  "/Users/tingyouzhao/Desktop/戒指/素材/home背景.png",
];

for (const fragment of requiredFragments) {
  assert.ok(html.includes(fragment), `Missing expected fragment: ${fragment}`);
}

assert.match(html, /const OPENING_TIMING = \{[\s\S]*blurIn: 900,[\s\S]*dissolve: 1450,[\s\S]*reveal: 620,/);
assert.match(html, /page\.classList\.add\("is-revealing"\);[\s\S]*const logoDissolve = introLogo\.animate/);
assert.match(html, /openingVeil\.animate\(/);
assert.match(html, /page\.classList\.add\("is-logo-landed"\)/);

console.log("home opening hero demo structure is present");
