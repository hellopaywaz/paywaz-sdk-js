import { PaywazClient } from "../dist/index.js";

const client = new PaywazClient("test_key", "2025-01-01");

if (!client) throw new Error("Failed to instantiate PaywazClient");
if (!client.payments) throw new Error("PaymentsClient not initialized");

console.log("Smoke OK");
