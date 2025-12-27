import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = process.cwd();
const openapiDir = resolve(root, "openapi");

function walkFiles(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      entries.push(...walkFiles(fullPath));
    } else {
      entries.push(fullPath);
    }
  }
  return entries;
}

function discoverSpecs() {
  const found = [];

  if (existsSync(openapiDir) && statSync(openapiDir).isDirectory()) {
    const candidates = walkFiles(openapiDir).filter((filePath) =>
      /\.(ya?ml|json)$/i.test(filePath)
    );
    found.push(...candidates);
  }

  const rootCandidates = readdirSync(root)
    .filter((entry) => /\.openapi\./i.test(entry))
    .map((entry) => resolve(root, entry));

  found.push(...rootCandidates);

  return found;
}

function main() {
  let specs;
  try {
    specs = discoverSpecs();
  } catch (error) {
    console.log("Error while scanning for OpenAPI specs:", error instanceof Error ? error.message : error);
    console.log("SDK generation skipped (offline placeholder).");
    process.exit(0);
  }

  if (specs.length === 0) {
    console.log("No OpenAPI specs detected under ./openapi or *.openapi.* in the repository root.");
  } else {
    console.log("Found OpenAPI spec candidates:");
    for (const spec of specs) {
      console.log(` - ${spec}`);
    }
  }

  console.log("SDK generation skipped (offline placeholder).");
}

main();
