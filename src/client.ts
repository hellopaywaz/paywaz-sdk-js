//
// Paywaz JavaScript SDK — Client (Preview)
// ----------------------------------------
// This client demonstrates how developers will interact with the
// Paywaz Public API in the future. The implementation here is a
// placeholder and does not perform real network requests.
//

export interface PaywazClientConfig {
  apiKey: string;          // Merchant or partner API key
  environment?: "sandbox" | "production";
}

export interface PaymentRequest {
  amount: string;
  currency: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  paymentId: string;
  status: string;
  amount: string;
  currency: string;
  metadata: Record<string, any>;
  message: string;
}

export class PaywazClient {
  private apiKey: string;
  private environment: string;

  constructor(config: PaywazClientConfig) {
    this.apiKey = config.apiKey;
    this.environment = config.environment ?? "sandbox";

    // In a real SDK, validation, logging, schema checks, and
    // environment setup would occur here.
  }

  /**
   * Placeholder function to simulate creating a payment.
   * In the real SDK, this would make a network request to the
   * Paywaz Public API.
   */
  async createPayment(payload: PaymentRequest): Promise<PaymentResponse> {
    console.log("Simulating Paywaz API call: createPayment()");
    console.log("Payload:", payload);

    // Simulated async delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      paymentId: "pay_placeholder_123",
      status: "created",
      amount: payload.amount,
      currency: payload.currency,
      metadata: payload.metadata ?? {},
      message: "This is a placeholder response from the Paywaz SDK."
    };
  }
}
