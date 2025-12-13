import { PaywazClient } from "@paywaz/sdk";

const client = new PaywazClient(process.env.PAYWAZ_API_KEY!);

export async function createPayment() {
  return client.payments.create(
    {
      amount: "2500",
      currency: "USDC",
      destination: "wallet_xyz789",
      metadata: {
        customer_id: "cust_456",
      },
    },
    crypto.randomUUID()
  );
}
