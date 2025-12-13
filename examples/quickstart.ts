import { PaywazClient } from "@paywaz/sdk";

const client = new PaywazClient(process.env.PAYWAZ_API_KEY!);

async function run() {
  const payment = await client.payments.create(
    {
      amount: "1000",
      currency: "USDC",
      destination: "wallet_abc123",
      autoConvert: true,
      metadata: {
        order_id: "order_123",
      },
    },
    "idem_123"
  );

  console.log("Payment created:", payment);
}

run().catch(console.error);
