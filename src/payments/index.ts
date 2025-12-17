export type CreatePaymentRequest = {
  amount: string | number;
  currency: string;
  destination: string;
  metadata?: Record<string, unknown>;
};

export type PaymentStatus = "created" | "pending" | "succeeded" | "failed" | "canceled";

export type Payment = {
  id: string;
  status: PaymentStatus;
  amount: string;
  currency: string;
  destination: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type ApiErrorBody = {
  error?: { code?: string; message?: string; details?: unknown };
};

function toErrorMessage(status: number, body: any) {
  const msg =
    body?.error?.message ||
    body?.message ||
    (typeof body === "string" ? body : null) ||
    `Request failed with status ${status}`;
  return msg;
}

export class PaymentsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://api.paywaz.com") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async create(payload: CreatePaymentRequest, idempotencyKey: string): Promise<Payment> {
    if (!idempotencyKey?.trim()) throw new Error("idempotencyKey is required");

    const res = await fetch(`${this.baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    const body = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return body?.data ?? body;
  }

  async retrieve(paymentId: string): Promise<Payment> {
    const res = await fetch(`${this.baseUrl}/payments/${encodeURIComponent(paymentId)}`, {
      method: "GET",
      headers: {
        "X-API-Key": this.apiKey,
      },
    });

    const text = await res.text();
    const body = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return body?.data ?? body;
  }
}
