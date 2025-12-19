// src/payments/index.ts

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

type ApiResponse<T> = {
  data?: T;
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
    if (!apiKey?.trim()) throw new Error("apiKey is required");
    this.apiKey = apiKey.trim();
    this.baseUrl = stripTrailingSlashes(baseUrl);
  }

  private normalizePayload(payload: CreatePaymentRequest): CreatePaymentRequest {
    if (!payload || typeof payload !== "object") {
      throw new Error("payload is required");
    }

    const amount =
      typeof payload.amount === "number"
        ? payload.amount.toString()
        : payload.amount?.trim();
    const currency = payload.currency?.trim();
    const destination = payload.destination?.trim();

    if (!amount) throw new Error("amount is required");
    if (!currency) throw new Error("currency is required");
    if (!destination) throw new Error("destination is required");

    return {
      ...payload,
      amount,
      currency,
      destination,
    };
  }

  private ensureIdempotencyKey(idempotencyKey: string): string {
    const normalized = idempotencyKey?.trim();
    if (!normalized) throw new Error("idempotencyKey is required");
    return normalized;
  }

  private async parseResponse<T>(res: Response): Promise<T> {
    const text = await res.text();
    const body = safeParseJson(text);

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return ((body as ApiResponse<T>)?.data ?? body) as T;
  }

  async create(
    payload: CreatePaymentRequest,
    idempotencyKey: string
  ): Promise<Payment> {
    const normalizedPayload = this.normalizePayload(payload);
    const normalizedIdempotencyKey = this.ensureIdempotencyKey(idempotencyKey);

    const res = await fetch(`${this.baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
        "Idempotency-Key": normalizedIdempotencyKey,
      },
      body: JSON.stringify(normalizedPayload),
    });

    return this.parseResponse<Payment>(res);
  }

  async retrieve(paymentId: string): Promise<Payment> {
    const normalizedPaymentId = paymentId?.trim();
    if (!normalizedPaymentId) throw new Error("paymentId is required");

    const res = await fetch(
      `${this.baseUrl}/payments/${encodeURIComponent(normalizedPaymentId)}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": this.apiKey,
        },
      }
    );

    return this.parseResponse<Payment>(res);
  }
}
