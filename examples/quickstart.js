//
// Paywaz JavaScript SDK — Quickstart Example (Preview)
// ----------------------------------------------------
// This is a conceptual demonstration of how developers will
// integrate Paywaz using the forthcoming JavaScript SDK.
//

import { PaywazClient } from "../src/client.js";

async function run() {
  // Initialize the client (placeholder key)
  const client = new PaywazClient({
    apiKey: "YOUR_API_KEY_HERE",
    environment: "sandbox"
  });

  console.log("Creating a Paywaz payment (placeholder)...");

  // Example request
  const payment = await client.createPayment({
    amount: "49.99",
    currency: "PZUSD",
    metadata: { orderId: "12345" }
  });

  console.log("Payment created:");
  console.log(payment);
}

run().catch(console.error);
