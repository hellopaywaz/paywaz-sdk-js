import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const specPath = path.resolve("openapi/openapi.yaml");
const rawSpec = readFileSync(specPath, "utf8");
const spec = JSON.parse(rawSpec);
const hash = createHash("sha256").update(rawSpec).digest("hex");

const outputDir = path.resolve("src/generated");
mkdirSync(outputDir, { recursive: true });

const paymentStatus = spec.components?.schemas?.Payment?.properties?.status?.enum ?? [];
const paymentStatusUnion = paymentStatus.length
  ? paymentStatus.map((value) => `"${value}"`).join(" | ")
  : "string";

const webhookEventTypes =
  spec.components?.schemas?.WebhookEvent?.properties?.type?.enum ?? [];
const webhookEventUnion = webhookEventTypes.length
  ? webhookEventTypes.map((value) => `"${value}"`).join(" | ")
  : "string";

const version = spec.info?.version ?? "unknown";

const typesFile = `// Auto-generated from openapi/openapi.yaml
// Hash: ${hash}
// Do not edit directly; run \`npm run generate:sdk\`.

export type PaymentStatus = ${paymentStatusUnion};

export type Payment = {
  id: string;
  status: PaymentStatus;
  amount: string;
  currency: string;
  destination?: string;
  transactionHash?: string | null;
  metadata?: Record<string, unknown>;
  createdAt: string;
};

export type CreatePaymentRequest = {
  amount: string;
  currency: string;
  destination: string;
  autoConvert?: boolean;
  metadata?: Record<string, unknown>;
};

export type WebhookEvent = {
  id: string;
  type: ${webhookEventUnion};
  eventVersion: string;
  livemode: boolean;
  createdAt: string;
  data: {
    payment: Payment;
  };
};

export const OPENAPI_VERSION = "${version}";
export const OPENAPI_HASH = "${hash}";
`;

const indexFile = `export * from "./types";
`;

writeFileSync(path.join(outputDir, "types.ts"), typesFile);
writeFileSync(path.join(outputDir, "index.ts"), indexFile);

console.log("SDK artifacts generated from OpenAPI.");
