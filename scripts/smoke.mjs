import { PaywazClient, webhooks } from "../dist/index.js";

const client = new PaywazClient({
  apiKey: "test_key",
  baseUrl: "https://api.paywaz.com"
});

if (!client) throw new Error("Failed to instantiate PaywazClient");
if (!webhooks || typeof webhooks.verifySignature !== "function") {
  throw new Error("webhooks.verifySignature is missing");
}

console.log("SDK smoke test OK");
