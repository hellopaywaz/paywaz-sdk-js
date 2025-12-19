import { OPENAPI_VERSION } from "./generated";

export interface PaywazClientOptions {
  apiKey: string;
  apiVersion?: string;
  baseUrl?: string;
}

export class PaywazClient {
  constructor(private options: PaywazClientOptions) {}

  get headers() {
    const headers: Record<string, string> = {
      "X-API-Key": this.options.apiKey,
    };

    if (this.options.apiVersion ?? OPENAPI_VERSION) {
      headers["Paywaz-Version"] = this.options.apiVersion ?? OPENAPI_VERSION;
    }

    return headers;
  }
}
