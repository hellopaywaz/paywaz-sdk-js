// Auto-generated from openapi/openapi.yaml
// Hash: ddb2a6f234bfa8d8d2bcb777d501f011df74ae77ef7e9c7bb42c539c9132c34c
// Do not edit directly; run `npm run generate:sdk`.

export type PaymentStatus = "pending" | "confirmed" | "settled" | "failed";

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
  type: "payment.pending" | "payment.confirmed" | "payment.settled" | "payment.failed";
  eventVersion: string;
  livemode: boolean;
  createdAt: string;
  data: {
    payment: Payment;
  };
};

export const OPENAPI_VERSION = "2025-01-01";
export const OPENAPI_HASH = "ddb2a6f234bfa8d8d2bcb777d501f011df74ae77ef7e9c7bb42c539c9132c34c";
