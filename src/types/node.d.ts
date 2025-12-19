declare type Buffer = Uint8Array;

declare const Buffer: {
  from(input: string, encoding?: BufferEncoding): Buffer;
  from(
    data: ArrayBuffer | ArrayBufferView | string | readonly number[],
    encoding?: BufferEncoding
  ): Buffer;
  byteLength(
    string: string | ArrayBuffer | ArrayBufferView,
    encoding?: BufferEncoding
  ): number;
  concat(list: readonly Buffer[], totalLength?: number): Buffer;
};

declare type BufferEncoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex";

declare namespace crypto {
  interface Hmac {
    update(data: string | ArrayBufferView): Hmac;
    digest(encoding: "hex"): string;
  }

  function createHmac(algorithm: string, key: string | Buffer): Hmac;
  function timingSafeEqual(a: Buffer, b: Buffer): boolean;
}

declare module "crypto" {
  export function createHmac(
    algorithm: string,
    key: string | Buffer
  ): crypto.Hmac;
  export function timingSafeEqual(a: Buffer, b: Buffer): boolean;
}
