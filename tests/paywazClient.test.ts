import { describe, it, expect, vi, afterEach } from "vitest";
import { PaywazClient } from "../src";

describe("PaywazClient", () => {
  afterEach(() => vi.restoreAllMocks());

  it("initializes a payments client", () => {
    const client = new PaywazClient({ apiKey: "test_key", apiVersion: "2025-01-01" });
    expect(client.payments).toBeDefined();
  });

  it("throws when idempotency key is missing", async () => {
    const client = new PaywazClient({ apiKey: "test_key" });

    await expect(
      client.payments.create(
        { amount: "10", currency: "USD", destination: "dest" },
        ""
      )
    ).rejects.toThrow(/idempotencyKey is required/);
  });

  it("calls fetch with the expected payload when creating a payment", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: () =>
        Promise.resolve(
          JSON.stringify({
            data: {
              id: "pay_123",
              status: "created",
              amount: "10",
              currency: "USD",
              destination: "dest",
              createdAt: "2025-01-01T00:00:00Z",
              updatedAt: "2025-01-01T00:00:00Z",
            },
          })
        ),
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const client = new PaywazClient({ apiKey: "test_key" });
    const payment = await client.payments.create(
      { amount: "10", currency: "USD", destination: "dest" },
      "idempotent-key"
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.paywaz.com/payments",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "X-API-Key": "test_key",
          "Idempotency-Key": "idempotent-key",
        }),
      })
    );
    expect(payment.id).toBe("pay_123");
  });
});
