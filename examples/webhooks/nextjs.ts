import { webhooks } from "@paywaz/sdk";

export async function POST(req: Request) {
  const payload = await req.text();

  webhooks.verifyPaywazWebhook({
    payload,
    signatureHeader: req.headers.get("paywaz-signature")!,
    timestampHeader: req.headers.get("paywaz-timestamp")!,
    secret: process.env.PAYWAZ_WEBHOOK_SECRET!,
  });

  return new Response("ok");
}
{
  "eventVersion": "2025-01-01"
}

