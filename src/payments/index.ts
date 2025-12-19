export const DEFAULT_API_VERSION = "2025-01-01";
export const DEFAULT_BASE_URL = "https://api.paywaz.com";

export type CreatePaymentRequest = {
  amount: string;
  currency: string;
  destination: string;
  autoConvert?: boolean;
  metadata?: Record<string, unknown>;
};

export type PaymentStatus = "pending" | "confirmed" | "settled" | "failed";

export type Payment = {
  id: string;
  status: PaymentStatus;
  amount: string;
  currency: string;
  destination: string;
  transactionHash?: string | null;
  metadata?: Record<string, unknown>;
  createdAt: string;
};

type ApiErrorBody = {
  error?: { code?: string; message?: string; details?: unknown };
  message?: string;
};

export type PaymentsClientOptions = {
  apiKey: string;
  apiVersion?: string;
  baseUrl?: string;
  fetchFn?: typeof fetch;
};

function toErrorMessage(status: number, body: ApiErrorBody | null) {
  const msg =
    body?.error?.message ||
    body?.message ||
    (typeof body === "string" ? body : null) ||
    `Request failed with status ${status}`;
  return msg;
}

export class PaymentsClient {
  private apiKey: string;
  private apiVersion: string;
  private baseUrl: string;
  private fetchImpl: typeof fetch;

  constructor({ apiKey, apiVersion, baseUrl, fetchFn }: PaymentsClientOptions) {
    if (!apiKey?.trim()) {
      throw new Error("apiKey is required");
    }

    this.apiKey = apiKey;
    this.apiVersion = apiVersion ?? DEFAULT_API_VERSION;
    this.baseUrl = (baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.fetchImpl = fetchFn ?? fetch;
  }

  private buildHeaders(extra?: HeadersInit): HeadersInit {
    return {
      "Content-Type": "application/json",
      "X-API-Key": this.apiKey,
      "Paywaz-Version": this.apiVersion,
      ...(extra ?? {}),
    };
  }

  private async parseResponse(res: Response) {
    const text = await res.text();
    const body = text ? (JSON.parse(text) as Record<string, unknown>) : null;

    if (!res.ok) {
      throw new Error(toErrorMessage(res.status, body as ApiErrorBody | null));
    }

    return body;
  }

  async create(payload: CreatePaymentRequest, idempotencyKey: string): Promise<Payment> {
    if (!idempotencyKey?.trim()) {
      throw new Error("idempotencyKey is required");
    }

    const res = await this.fetchImpl(`${this.baseUrl}/payments`, {
      method: "POST",
      headers: this.buildHeaders({ "Idempotency-Key": idempotencyKey }),
      body: JSON.stringify({
        autoConvert: false,
        ...payload,
      }),
    });

    return (await this.parseResponse(res)) as Payment;
  }

  async retrieve(paymentId: string): Promise<Payment> {
    if (!paymentId?.trim()) {
      throw new Error("paymentId is required");
    }

    const res = await this.fetchImpl(`${this.baseUrl}/payments/${encodeURIComponent(paymentId)}`, {
      method: "GET",
      headers: this.buildHeaders(),
    });

    return (await this.parseResponse(res)) as Payment;
  }
}
