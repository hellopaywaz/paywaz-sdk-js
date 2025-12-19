// scripts/smoke.mjs
import { PaywazClient } from "../dist/index.esm.js";

const client = new PaywazClient({ apiKey: "smoke_test_key" });

if (!client || !client.payments) {
  throw new Error("Smoke failed: PaywazClient did not initialize payments client.");
}

console.log("Smoke OK: import + instantiate worked.");
