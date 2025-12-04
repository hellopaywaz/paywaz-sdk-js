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
