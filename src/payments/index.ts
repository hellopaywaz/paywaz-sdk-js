export type CreatePaymentRequest = {
  amount: string | number;
  currency: string;
  destination: string;
  metadata?: Record<string, unknown>;
};

export type PaymentStatus =
  | "created"
  | "pending"
  | "succeeded"
  | "failed"
  | "canceled";

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
  message?: string;
};

function stripTrailingSlashes(input: string): string {
  let s = String(input ?? "").trim();
  while (s.endsWith("/")) s = s.slice(0, -1);
  return s;
}

function toErrorMessage(status: number, body: any): string {
  const msg =
    body?.error?.message ||
    body?.message ||
    (typeof body === "string" ? body : null) ||
    `Request failed with status ${status}`;
  return msg;
}

function safeParseJson(text: string): any {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export class PaymentsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://api.paywaz.com") {
  this.apiKey = apiKey;
  this.baseUrl = stripTrailingSlashes(baseUrl);
}
  }

  async create(
    payload: CreatePaymentRequest,
    idempotencyKey: string
  ): Promise<Payment> {
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
    const body = safeParseJson(text);

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return (body?.data ?? body) as Payment;
  }

  async retrieve(paymentId: string): Promise<Payment> {
    const res = await fetch(
      `${this.baseUrl}/payments/${encodeURIComponent(paymentId)}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": this.apiKey,
        },
      }
    );

    const text = await res.text();
    const body = safeParseJson(text);

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return (body?.data ?? body) as Payment;
  }
}
