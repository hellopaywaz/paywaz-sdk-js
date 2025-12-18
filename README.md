# Paywaz JavaScript SDK (Preview)

> **Preview notice**: This SDK is under active development and its API may change.

## Overview

The Paywaz JavaScript SDK is a lightweight client for integrating with the Paywaz Payments API. It provides:

- Simple helper functions to create and retrieve payments.
- Webhook verification utilities for secure event handling.
- TypeScript support with generated types.

For sample webhook handlers see:

  https://github.com/hellopaywaz/paywaz-samples/tree/main/javascript/webhooks-node#local-test-no-paywaz-needed

---

## Quick Start

> Note: This example uses top-level `await` (Node 18+/20+ with ESM). If you’re using CommonJS, wrap it in an async function.

```js
import { PaywazClient, webhooks } from "@paywaz/sdk";

// You can pass an apiKey directly or an options object
const client = new PaywazClient({ apiKey: "YOUR_API_KEY", apiVersion: "2025-01-01" });

const payment = await client.payments.createPayment({
  amount: "49.99",
  currency: "USD",
  destination: "wallet_123",
});

console.log(payment);
```
