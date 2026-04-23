import { execSync } from "child_process";

// 1. Generate SDK
execSync(
  `npx @openapitools/openapi-generator-cli generate \
    -i ./openapi/openapi.yaml \
    -g typescript-fetch \
    -o ./src/generated \
    --additional-properties=supportsES6=true,typescriptThreePlus=true \
    --global-property=apiDocs=false,modelDocs=false \
    --skip-validate-spec`,
  { stdio: "inherit" }
);

// 2. 🔥 FORCE REMOVE NON-DETERMINISTIC FILES
execSync("rm -rf ./src/generated/.openapi-generator", { stdio: "inherit" });
execSync("rm -f ./src/generated/.openapi-generator-ignore", { stdio: "inherit" });