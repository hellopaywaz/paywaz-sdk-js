// scripts/generate-sdk.mjs
import fs from "node:fs";
import path from "node:path";

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

const candidates = [
  "openapi",
  "openapi.yaml",
  "openapi.yml",
  "uatp-pilot.openapi.yaml",
  "paywaz.openapi.yaml",
];

const found = candidates.filter((p) => exists(path.resolve(p)));

if (found.length === 0) {
  console.log("SDK generation skipped (offline placeholder). No OpenAPI inputs found in common locations.");
  process.exit(0);
}

console.log("SDK generation skipped (offline placeholder). Found OpenAPI inputs:");
for (const f of found) console.log(`- ${f}`);
process.exit(0);
