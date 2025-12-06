<p align="center">
  <a href="https://www.npmjs.com/package/@paywaz/sdk-js">
    <img src="https://img.shields.io/npm/v/@paywaz/sdk-js.svg" alt="npm version" />
  </a>
  <a href="https://github.com/hellopaywaz/paywaz-sdk-js/actions">
    <img src="https://github.com/hellopaywaz/paywaz-sdk-js/workflows/CI/badge.svg" alt="build status" />
  </a>
  <a href="https://github.com/hellopaywaz/paywaz-license">
    <img src="https://img.shields.io/badge/license-Paywaz-blue.svg" alt="license" />
  </a>
</p>
# Paywaz JavaScript SDK (Preview)

The **Paywaz JavaScript SDK** provides an easy way to integrate zero-fee, crypto-native payment processing into your website, ecommerce platform, POS, or enterprise application.

> SDK is in pre-release mode.  
> Interfaces, request structures, and endpoints are subject to change as Paywaz approaches public launch.

---

## Features (Preview)
- Initialize payments with one function  
- Non-custodial wallet support  
- Auto-convert tokens to hedged stablecoins  
- Built-in signature validation  
- Lightweight client-side & server-side compatibility  
- Designed for high-scale environments (Solana Mainnet)

---

## Quick Start
```js
import { PaywazClient } from "paywaz-sdk-js";

const client = new PaywazClient({ apiKey: "YOUR_API_KEY" });

const session = await client.createPayment({
  amount: "49.99",
  currency: "PZUSD",
  metadata: { orderId: "12345" }
});

console.log(session);
