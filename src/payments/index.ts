export type CreatePaymentRequest = Record<string, unknown>;
export type CreatePaymentResponse = Record<string, unknown>;

export type PaymentsCreateOptions = {
  idempotencyKey?: string;
};

export interface PaymentsClient {
  create(
    payload: CreatePaymentRequest,
    opts?: PaymentsCreateOptions
  ): Promise<CreatePaymentResponse>;
}

export class PaymentsClientImpl implements PaymentsClient {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  async create(
    payload: CreatePaymentRequest,
    opts: PaymentsCreateOptions = {}
  ): Promise<CreatePaymentResponse> {
    const headers: Record<string, string> = {
      "content-type": "application/json",
      authorization: `Bearer ${this.apiKey}`
    };

    if (opts.idempotencyKey) {
      headers["idempotency-key"] = opts.idempotencyKey;
    }

    const res = await this.fetchImpl(`${this.baseUrl}/payments`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    let data: unknown = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      const err = new Error(`Paywaz API error ${res.status}`);
      (err as any).status = res.status;
      (err as any).data = data;
      throw err;
    }

    return data as CreatePaymentResponse;
  }
}
