import crypto from "crypto";

export type CreatePaymentRequest = {
  amount: string | number;
  currency: string;
  destination: string;
  autoConvert?: boolean;
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

type NormalizedHeaders = Record<string, string>;

function buildHeaders(apiKey: string, apiVersion?: string, idempotencyKey?: string): NormalizedHeaders {
  const headers: NormalizedHeaders = {
    "Content-Type": "application/json",
    "X-API-Key": apiKey,
  };

  if (apiVersion) {
    headers["Paywaz-Version"] = apiVersion;
  }

  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  return headers;
}

function parseJson(text: string | null) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function toErrorMessage(status: number, body: any) {
  const msg =
    body?.error?.message ||
    body?.message ||
    (typeof body === "string" ? body : null) ||
    `Request failed with status ${status}`;
  return msg;
}

function generateIdempotencyKey() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `idem_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export class PaymentsClient {
  private apiKey: string;
  private apiVersion?: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://api.paywaz.com", apiVersion?: string) {
    this.apiKey = apiKey;
    this.apiVersion = apiVersion;
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async create(payload: CreatePaymentRequest, idempotencyKey?: string): Promise<Payment> {
    const idemKey = idempotencyKey?.trim() || generateIdempotencyKey();

    const res = await fetch(`${this.baseUrl}/payments`, {
      method: "POST",
      headers: buildHeaders(this.apiKey, this.apiVersion, idemKey),
      body: JSON.stringify(payload),
    });

    const body = parseJson(await res.text());

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return (body as any)?.data ?? body;
  }

  async retrieve(paymentId: string): Promise<Payment> {
    const res = await fetch(`${this.baseUrl}/payments/${encodeURIComponent(paymentId)}`, {
      method: "GET",
      headers: buildHeaders(this.apiKey, this.apiVersion),
    });

    const body = parseJson(await res.text());

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return (body as any)?.data ?? body;
  }

  async createPayment(payload: CreatePaymentRequest, idempotencyKey?: string): Promise<Payment> {
    return this.create(payload, idempotencyKey);
  }

  async retrievePayment(paymentId: string): Promise<Payment> {
    return this.retrieve(paymentId);
  }
}
