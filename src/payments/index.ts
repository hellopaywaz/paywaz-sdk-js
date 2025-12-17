import { PaymentsClient } from "./payments";
import * as webhooks from "./webhooks";

export type PaywazClientOptions = {
  apiKey: string;
  baseUrl?: string;
  paywazVersion?: string;
};

export class PaywazClient {
  payments: PaymentsClient;

  constructor(options: PaywazClientOptions) {
    this.payments = new PaymentsClient(options.apiKey, {
      baseUrl: options.baseUrl,
      paywazVersion: options.paywazVersion
    });
  }
}

export { webhooks };
