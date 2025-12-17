import { PaymentsApi } from "../generated/api";
import type { CreatePaymentRequest, Payment } from "../generated/models";

export type PaymentsClientOptions = {
  baseUrl?: string;
  paywazVersion?: string;
};

export class PaymentsClient {
  private api: PaymentsApi;
  private headers: Record<string, string>;

  constructor(apiKey: string, options: PaymentsClientOptions = {}) {
    const baseUrl = options.baseUrl ?? "https://api.paywaz.com";

    this.headers = {
      "X-API-Key": apiKey
    };

    if (options.paywazVersion) {
      this.headers["Paywaz-Version"] = options.paywazVersion;
    }

    this.api = new PaymentsApi({
      basePath: baseUrl,
      headers: this.headers
    });
  }

  async create(payload: CreatePaymentRequest, idempotencyKey: string): Promise<Payment> {
    return this.api.createPayment(payload, {
      "Idempotency-Key": idempotencyKey
    });
  }

  async retrieve(paymentId: string): Promise<Payment> {
    return this.api.getPayment(paymentId);
  }
}
