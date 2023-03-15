import type { METHOD } from "./utils";

export type TOptions = {
  method: METHOD;
  data?: XMLHttpRequestBodyInit | null;
  headers?: Record<string, string>;
};

export type TOptionsWithoutMethod = Omit<TOptions, "method">;