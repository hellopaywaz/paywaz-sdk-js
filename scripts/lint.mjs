import { spawn } from "node:child_process";
import { resolve } from "node:path";

const typecheckScript = resolve(process.cwd(), "scripts", "typecheck.mjs");
const child = spawn(process.execPath, [typecheckScript], { stdio: "inherit" });

child.on("close", (code) => {
  process.exit(code ?? 1);
});
