import { execSync } from "child_process";

execSync(
  `./node_modules/.bin/openapi-generator-cli generate \
  -i ./openapi/openapi.yaml \
  -g typescript-fetch \
  -o ./src/generated \
  --additional-properties=supportsES6=true,typescriptThreePlus=true \
  --skip-validate-spec`,
  { stdio: "inherit" }
);