export type CreatePaymentRequest = Record<string, unknown>;
export type Payment = Record<string, unknown>;

export type PaymentsClientOptions = {
  apiKey: string;
  baseUrl?: string; // default: https://api.paywaz.com
  fetchImpl?: typeof fetch;
};

export type CreatePaymentOptions = {
  idempotencyKey?: string;
};

export class PaymentsClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(opts: PaymentsClientOptions) {
    if (!opts?.apiKey) throw new Error("PaymentsClient requires apiKey");

    this.apiKey = opts.apiKey;
    this.baseUrl = (opts.baseUrl ?? "https://api.paywaz.com").replace(/\/+$/, "");
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  /**
   * Create a payment
   * POST /payments
   */
  async createPayment(
    payload: CreatePaymentRequest,
    options: CreatePaymentOptions = {}
  ): Promise<Payment> {
    return this.request<Payment>("POST", "/payments", payload, options);
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    body?: unknown,
    options: { idempotencyKey?: string } = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const headers: Record<string, string> = {
      "content-type": "application/json",
      authorization: `Bearer ${this.apiKey}`
    };

    if (options.idempotencyKey) {
      headers["idempotency-key"] = options.idempotencyKey;
    }

    const res = await this.fetchImpl(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Paywaz API error ${res.status}: ${text || res.statusText}`);
    }

    // If API returns empty body
    const text = await res.text();
    return (text ? JSON.parse(text) : {}) as T;
  }
}
