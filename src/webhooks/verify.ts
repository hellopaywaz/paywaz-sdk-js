import crypto from "node:crypto";

export function verifyPaywazWebhook({
  payload,
  signatureHeader,
  timestampHeader,
  secret,
}: {
  payload: string;
  signatureHeader: string | null;
  timestampHeader: string | null;
  secret: string;
}) {
  if (!signatureHeader || !timestampHeader) {
    throw new Error("Missing Paywaz webhook headers");
  }

  const timestamp = Number(timestampHeader);
  if (Number.isNaN(timestamp)) {
    throw new Error("Invalid Paywaz-Timestamp header");
  }

  const signedPayload = `${timestamp}.${payload}`;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  const provided = signatureHeader.replace(/^v1=/, "");

  if (
    expected.length !== provided.length ||
    !crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(provided)
    )
  ) {
    throw new Error("Invalid Paywaz webhook signature");
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    throw new Error("Webhook timestamp expired");
  }

  return true;
}
