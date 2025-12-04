//
// Paywaz JavaScript SDK — Utilities (Preview)
// -------------------------------------------
// Placeholder utility functions to demonstrate how helpers
// might be structured inside the future Paywaz SDK.
//

/**
 * Simulates generating a unique ID.
 * In production, this might use a server-generated ID,
 * UUID library, or cryptographic randomness.
 */
export function generateId(prefix: string = "pz"): string {
  const random = Math.floor(Math.random() * 1_000_000);
  return `${prefix}_${random}`;
}

/**
 * Simple logger wrapper.
 */
export function log(message: string, ...args: any[]) {
  console.log(`[Paywaz SDK] ${message}`, ...args);
}
