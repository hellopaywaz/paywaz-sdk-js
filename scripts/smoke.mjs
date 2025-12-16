import { PaywazClient } from "../dist/index.js";

const client = new PaywazClient({
  apiKey: "test_key",
  baseUrl: "https://api.paywaz.com",
});

if (!client) throw new Error("Failed to instantiate PaywazClient");

console.log("Smoke OK");
