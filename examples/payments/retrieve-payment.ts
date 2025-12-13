import { PaywazClient } from "@paywaz/sdk";

const client = new PaywazClient(process.env.PAYWAZ_API_KEY!);

export async function retrievePayment(paymentId: string) {
  return client.payments.retrieve(paymentId);
}
