//
// Paywaz JavaScript SDK — Quickstart Example (Preview)
// ----------------------------------------------------
// This is a conceptual demonstration of how developers will
// integrate Paywaz using the forthcoming JavaScript SDK.
//

import { PaywazClient } from "../src/client.js";

async function run() {
  const client = new PaywazClient({
    apiKey: "YOUR_API_KEY_HERE",
    apiVersion: "2025-01-01",
  });

  console.log("Creating a Paywaz payment (placeholder)...");

  const payment = await client.payments.createPayment({
    amount: "49.99",
    currency: "PZUSD",
    destination: "destination_wallet",
    metadata: { orderId: "12345" },
  });

  console.log("Payment created:");
  console.log(payment);
}

run().catch(console.error);
