import { PaymentsClient } from "./payments";
import * as webhooks from "./webhooks";

export type PaywazClientOptions = {
  apiKey: string;
  apiVersion?: string;
  baseUrl?: string;
};

function normalizeOptions(
  options: PaywazClientOptions | string,
  apiVersion?: string,
  baseUrl?: string
): PaywazClientOptions {
  if (typeof options === "string") {
    return { apiKey: options, apiVersion, baseUrl };
  }

  return options;
}

export class PaywazClient {
  payments: PaymentsClient;

  constructor(options: PaywazClientOptions | string, apiVersion?: string, baseUrl?: string) {
    const normalized = normalizeOptions(options, apiVersion, baseUrl);

    this.payments = new PaymentsClient(normalized.apiKey, {
      apiVersion: normalized.apiVersion,
      baseUrl: normalized.baseUrl,
    });
  }
}

export * from "./generated";
export { webhooks };
