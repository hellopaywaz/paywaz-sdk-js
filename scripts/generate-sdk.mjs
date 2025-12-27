import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const generatorBin = resolve(
  process.cwd(),
  "node_modules",
  ".bin",
  "openapi-generator-cli",
);

execFileSync(
  generatorBin,
  [
    "generate",
    "-i",
    "./openapi/openapi.yaml",
    "-g",
    "typescript-fetch",
    "-o",
    "./src/generated",
    "--additional-properties",
    "supportsES6=true,typescriptThreePlus=true",
  ],
  {
    stdio: "inherit",
  },
);
