// scripts/docs.mjs
import fs from "node:fs";
import path from "node:path";

const docsPath = path.resolve("docs");

function ensureDocsDir() {
  if (fs.existsSync(docsPath)) {
    const stat = fs.lstatSync(docsPath);
    if (!stat.isDirectory()) {
      // If a file named "docs" exists, replace it with a directory
      fs.unlinkSync(docsPath);
      fs.mkdirSync(docsPath, { recursive: true });
    }
  } else {
    fs.mkdirSync(docsPath, { recursive: true });
  }
}

function writeReadme() {
  const p = path.join(docsPath, "README.md");
  const content = `# Paywaz SDK Docs

This folder is used by CI ("npm run docs") to ensure documentation can be built.

> Placeholder docs: replace with Typedoc (or your preferred generator) when ready.
`;
  fs.writeFileSync(p, content, "utf8");
}

ensureDocsDir();
writeReadme();
console.log("Docs generated (placeholder).");
