mkdir -p scripts
cat > scripts/generate-sdk.mjs <<'MJS'
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(process.cwd());
const openapiDir = join(root, "openapi");

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function findFirstSpec() {
  const files = walk(openapiDir);
  const specs = files.filter((p) => /\.(ya?ml|json)$/i.test(p));
  // Prefer common names if present
  const preferred = specs.find((p) => /openapi|swagger/i.test(p));
  return preferred || specs[0] || null;
}

const spec = findFirstSpec();
if (!spec) {
  console.log("No OpenAPI spec found under ./openapi. Skipping generation.");
  process.exit(0);
}

const configCandidates = [
  join(openapiDir, "openapi-generator.config.json"),
  join(openapiDir, "openapi-generator.json"),
  join(openapiDir, "generator-config.json"),
  join(openapiDir, "generator.config.json"),
  join(openapiDir, "openapi-generator.yml"),
  join(openapiDir, "openapi-generator.yaml"),
];
const config = configCandidates.find(existsSync);

const genBin = join(root, "node_modules", ".bin", "openapi-generator-cli");

if (!config) {
  console.log(`OpenAPI spec detected (${spec}) but no generator config found in ./openapi.`);
  console.log("Skipping generation (CI will still be able to run the script).");
  process.exit(0);
}

if (!existsSync(genBin)) {
  console.log("openapi-generator-cli is not installed. Skipping generation.");
  process.exit(0);
}

console.log(`Generating SDK from ${spec} using config ${config}...`);
const res = spawnSync(genBin, ["generate", "-c", config], { stdio: "inherit" });
process.exit(res.status ?? 1);
MJS
