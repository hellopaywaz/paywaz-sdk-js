import { PaymentsClient } from "./payments";

export type PaywazClientOptions = {
  apiKey: string;
  apiVersion?: string;
  baseUrl?: string;
};

function normalizeOptions(
  apiKeyOrOptions: PaywazClientOptions | string,
  apiVersion?: string,
  baseUrl?: string
): PaywazClientOptions {
  if (typeof apiKeyOrOptions === "string") {
    if (!apiKeyOrOptions.trim()) {
      throw new Error("apiKey is required");
    }

    return {
      apiKey: apiKeyOrOptions,
      apiVersion,
      baseUrl,
    };
  }

  if (!apiKeyOrOptions?.apiKey?.trim()) {
    throw new Error("apiKey is required");
  }

  return apiKeyOrOptions;
}

export class PaywazClient {
  payments: PaymentsClient;

  constructor(apiKeyOrOptions: PaywazClientOptions | string, apiVersion?: string, baseUrl?: string) {
    const options = normalizeOptions(apiKeyOrOptions, apiVersion, baseUrl);
    this.payments = new PaymentsClient(options.apiKey, options.baseUrl, options.apiVersion);
  }
}
