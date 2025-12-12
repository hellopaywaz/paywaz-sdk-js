import { PaymentsApi } from "../generated/api";
import type {
  CreatePaymentRequest,
  Payment,
} from "../generated/models";

export class PaymentsClient {
  private api: PaymentsApi;

  constructor(apiKey: string, baseUrl = "https://api.paywaz.com") {
    this.api = new PaymentsApi({
      basePath: baseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  async create(
    payload: CreatePaymentRequest,
    idempotencyKey: string
  ): Promise<Payment> {
    const res = await this.api.createPayment(
      payload,
      { "Idempotency-Key": idempotencyKey }
    );
    return res;
  }

  async retrieve(paymentId: string): Promise<Payment> {
    return this.api.getPayment(paymentId);
  }
}
