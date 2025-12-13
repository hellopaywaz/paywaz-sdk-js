export interface PaywazClientOptions {
  apiKey: string;
  apiVersion?: string;
  baseUrl?: string;
}

export class PaywazClient {
  constructor(private options: PaywazClientOptions) {}

  get headers() {
    return {
      Authorization: `Bearer ${this.options.apiKey}`,
      "Paywaz-Version": this.options.apiVersion ?? "2025-01-01",
    };
  }
}
