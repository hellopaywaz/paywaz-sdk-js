import { execFile } from "node:child_process";
import { resolve } from "node:path";

const tscBin = resolve(process.cwd(), "node_modules", ".bin", "tsc");
const args = ["-p", "tsconfig.json", "--noEmit", ...process.argv.slice(2)];

execFile(tscBin, args, { stdio: "inherit" }, (error) => {
  if (error) {
    process.exit(error.code || 1);
  }
});
