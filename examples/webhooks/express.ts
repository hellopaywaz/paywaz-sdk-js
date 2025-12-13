import express from "express";
import bodyParser from "body-parser";
import { webhooks } from "@paywaz/sdk";

const app = express();

app.post(
  "/webhooks/paywaz",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    webhooks.verifyPaywazWebhook({
      payload: req.body.toString(),
      signatureHeader: req.headers["paywaz-signature"] as string,
      timestampHeader: req.headers["paywaz-timestamp"] as string,
      secret: process.env.PAYWAZ_WEBHOOK_SECRET!,
    });

    res.sendStatus(200);
  }
);

app.listen(3000);
