import { PaymentsClient } from "./payments";
import * as webhooks from "./webhooks";

export class PaywazClient {
  payments: PaymentsClient;

  constructor(apiKey: string, baseUrl = "https://api.paywaz.com") {
    this.payments = new PaymentsClient(apiKey, baseUrl);
  }
}

export { webhooks };

