import { PaywazClient } from "@paywaz/sdk";

const client = new PaywazClient(process.env.PAYWAZ_API_KEY!);

export async function autoConvertExample() {
  return client.payments.createPayment(
    {
      amount: "5000",
      currency: "SOL",
      destination: "wallet_sol_123",
      autoConvert: true,
    },
    "idem_autoconvert"
  );
}
