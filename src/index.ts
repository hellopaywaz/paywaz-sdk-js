import { PaymentsClient } from "./payments";
import * as webhooks from "./webhooks";

export class PaywazClient {
  payments: PaymentsClient;

  constructor(apiKey: string, apiVersion?: string) {
    this.payments = new PaymentsClient(apiKey, apiVersion);
  }
}

export { webhooks };

