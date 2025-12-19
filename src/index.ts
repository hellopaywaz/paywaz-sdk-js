import { PaymentsClient } from "./payments";
import * as webhooks from "./webhooks";
export * from "./generated/openapi-metadata";

export type PaywazClientOptions = {
  apiKey: string;
  apiVersion?: string;
};

export class PaywazClient {
  payments: PaymentsClient;

  constructor(options: PaywazClientOptions) {
    this.payments = new PaymentsClient(options.apiKey, options.apiVersion);
  }
}

export { webhooks };
