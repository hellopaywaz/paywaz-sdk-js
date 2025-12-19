import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const vendorDir = resolve(process.cwd(), "vendor");
const typescriptTar = resolve(vendorDir, "typescript-5.9.3.tgz");

if (!existsSync(typescriptTar)) {
  console.error("Missing vendored TypeScript tarball. Please add vendor/typescript-5.9.3.tgz");
  process.exit(1);
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const args = ["install", "--no-progress", "--prefer-offline", "--ignore-scripts", "--no-fund", typescriptTar];

const child = spawn(npm, args, { stdio: "inherit" });
child.on("close", (code) => {
  process.exit(code ?? 1);
});
