import { DEFAULT_API_VERSION, DEFAULT_BASE_URL, PaymentsClient } from "./payments";

export interface PaywazClientOptions {
  apiKey: string;
  apiVersion?: string;
  baseUrl?: string;
  fetchFn?: typeof fetch;
}

export class PaywazClient {
  readonly payments: PaymentsClient;
  readonly apiVersion: string;
  readonly baseUrl: string;

  constructor(options: PaywazClientOptions) {
    const apiVersion = options.apiVersion ?? DEFAULT_API_VERSION;
    const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;

    this.apiVersion = apiVersion;
    this.baseUrl = baseUrl;
    this.payments = new PaymentsClient({
      apiKey: options.apiKey,
      apiVersion,
      baseUrl,
      fetchFn: options.fetchFn,
    });
  }
}
