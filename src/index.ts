import { PaymentsClient } from "./payments";
import * as webhooks from "./webhooks";

export class PaywazClient {
  payments: PaymentsClient;

  constructor(apiKey: string) {
    this.payments = new PaymentsClient(apiKey);
  }
}

export { webhooks };
