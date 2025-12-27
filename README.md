# Paywaz JavaScript SDK (Preview)

<p align="center">
  <img src="https://img.shields.io/badge/npm-pre--release-blue" alt="npm version" />
  <img src="https://img.shields.io/badge/build-pending-lightgrey" alt="build status" />
  <a href="https://github.com/hellopaywaz/paywaz-license">
    <img src="https://img.shields.io/badge/license-Paywaz-0068e8.svg" alt="license" />
  </a>
</p>

## Links

- **SDK Docs (GitHub Pages):** https://hellopaywaz.github.io/paywaz-sdk-js/
- **Runnable Samples:** https://github.com/hellopaywaz/paywaz-samples
- **API Versioning Contract:** https://github.com/hellopaywaz/paywaz-public-api/blob/main/docs/versioning.md
- **Webhook Best Practices:** https://github.com/hellopaywaz/paywaz-public-api/blob/main/docs/webhooks-best-practices.md

The **Paywaz JavaScript SDK** provides an easy way to integrate zero-fee, crypto-native payment processing into your website, ecommerce platform, POS, or enterprise application.

> SDK is in pre-release mode.  
> Interfaces, request structures, and endpoints are subject to change as Paywaz approaches public launch.
>
> Paywaz-Version: 2025-01-01

---

## Features (Preview)

- Initialize payments with one function
- Non-custodial wallet support
- Auto-convert tokens to hedged stablecoins
- Built-in signature validation
- Lightweight client-side & server-side compatibility
- Designed for high-scale environments (Solana Mainnet)

---

## Examples

### Payments (Runnable)
- Create a payment (Node):  
  https://github.com/hellopaywaz/paywaz-samples/tree/main/javascript/payments#create-a-payment
- Retrieve a payment (Node):  
  https://github.com/hellopaywaz/paywaz-samples/tree/main/javascript/payments#retrieve-a-payment

### Webhooks (Runnable)
- Webhook receiver + signature verification (Node):  
  https://github.com/hellopaywaz/paywaz-samples/tree/main/javascript/webhooks-node
- Local signed webhook test (no Paywaz needed):  
  https://github.com/hellopaywaz/paywaz-samples/tree/main/javascript/webhooks-node#local-test-no-paywaz-needed

---

## Quick Start

> Note: This example uses top-level `await` (Node 18+/20+ with ESM). If you’re using CommonJS, wrap it in an async function.

```js
import { PaywazClient, webhooks } from "@paywaz/sdk";

const client = new PaywazClient("YOUR_API_KEY", "2025-01-01"); // apiVersion optional

const payment = await client.payments.createPayment({
  amount: { currency: "USD", value: "49.99" },
});

console.log(payment);

```

## Development / CI parity

Run the same steps locally as CI:

- `npm ci`
- `npm run typecheck`
- `npm run build`
- `npm run docs`
