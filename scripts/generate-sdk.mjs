import { execFileSync } from "node:child_process";

const args = [
  "-y",
  "@openapitools/openapi-generator-cli",
  "generate",
  "-i",
  "./openapi/openapi.yaml",
  "-g",
  "typescript-fetch",
  "-o",
  "./src/generated",
  "--additional-properties",
  "supportsES6=true,typescriptThreePlus=true",
];

try {
  execFileSync("npx", args, { stdio: "inherit" });
} catch (error) {
  console.error("SDK generation failed", error);
  process.exit(error?.status || error?.code || 1);
}
