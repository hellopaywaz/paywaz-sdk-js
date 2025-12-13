fastify.post(
  "/webhooks/paywaz",
  { rawBody: true },
  async (req, reply) => {
    webhooks.verifyPaywazWebhook({
      payload: req.rawBody!,
      signatureHeader: req.headers["paywaz-signature"] as string,
      timestampHeader: req.headers["paywaz-timestamp"] as string,
      secret: process.env.PAYWAZ_WEBHOOK_SECRET!,
    });

    reply.code(200).send();
  }
);
{
  "eventVersion": "2025-01-01"
}

