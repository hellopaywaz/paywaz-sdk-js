import { execFile } from "node:child_process";
import { resolve } from "node:path";

const tscBin = resolve(process.cwd(), "node_modules", ".bin", "tsc");
const args = ["-p", "tsconfig.build.json"];

execFile(tscBin, args, { stdio: "inherit" }, (error) => {
  if (error) {
    console.error("Build failed", error);
    process.exit(error.code || 1);
  }
});
