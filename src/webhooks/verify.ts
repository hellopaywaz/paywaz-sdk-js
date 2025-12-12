import crypto from "crypto";

export interface VerifyWebhookArgs {
  payload: string;           // RAW request body
  signatureHeader: string;   // Paywaz-Signature
  timestampHeader: string;   // Paywaz-Timestamp
  secret: string;            // Webhook signing secret
}

export function verifyPaywazWebhook({
  payload,
  signatureHeader,
  timestampHeader,
  secret,
}: VerifyWebhookArgs): true {
  if (!signatureHeader || !timestampHeader) {
    throw new Error("Missing webhook signature headers");
  }

  const timestamp = Number(timestampHeader);
  if (Number.isNaN(timestamp)) {
    throw new Error("Invalid webhook timestamp");
  }

  // Replay protection (5 minutes)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    throw new Error("Webhook timestamp expired");
  }

  const signedPayload = `${timestamp}.${payload}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  const providedSignature = signatureHeader.replace(/^v1=/, "");

  if (
    !crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "hex"),
      Buffer.from(providedSignature, "hex")
    )
  ) {
    throw new Error("Invalid webhook signature");
  }

  return true;
}
