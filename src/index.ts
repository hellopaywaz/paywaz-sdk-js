// src/index.ts

import { PaymentsClient } from "./payments/index.js";
import * as webhooks from "./webhooks/index.js";

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
