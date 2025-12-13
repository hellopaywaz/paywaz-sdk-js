import { execSync } from "child_process";

execSync(`
  npx openapi-generator-cli generate \
    -i ./openapi/openapi.yaml \
    -g typescript-fetch \
    -o ./src/generated \
    --additional-properties=supportsES6=true,typescriptThreePlus=true
`, { stdio: "inherit" });
