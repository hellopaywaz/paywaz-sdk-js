import { CreatePaymentRequest, OPENAPI_VERSION, Payment, PaymentStatus } from "../generated";
export type { CreatePaymentRequest, Payment, PaymentStatus } from "../generated";

type ApiErrorBody = {
  error?: { code?: string; message?: string; details?: unknown };
};

type RequestOptions = {
  apiVersion?: string;
  baseUrl?: string;
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
  private apiVersion?: string;

  constructor(apiKey: string, options: RequestOptions = {}) {
    this.apiKey = apiKey;
    this.apiVersion = options.apiVersion ?? OPENAPI_VERSION;
    this.baseUrl = (options.baseUrl ?? "https://api.paywaz.com").replace(/\/+$/, "");
  }

  async create(payload: CreatePaymentRequest, idempotencyKey: string): Promise<Payment> {
    if (!idempotencyKey?.trim()) throw new Error("idempotencyKey is required");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-API-Key": this.apiKey,
      "Idempotency-Key": idempotencyKey,
    };

    if (this.apiVersion) {
      headers["Paywaz-Version"] = this.apiVersion;
    }

    const res = await fetch(`${this.baseUrl}/payments`, {
      method: "POST",
      headers,
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
    const headers: Record<string, string> = {
      "X-API-Key": this.apiKey,
    };

    if (this.apiVersion) {
      headers["Paywaz-Version"] = this.apiVersion;
    }

    const res = await fetch(`${this.baseUrl}/payments/${encodeURIComponent(paymentId)}`, {
      method: "GET",
      headers,
    });

    const text = await res.text();
    const body = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody));
    }

    return body?.data ?? body;
  }
}
