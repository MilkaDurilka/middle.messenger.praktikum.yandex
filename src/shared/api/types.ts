import type { METHOD } from "./utils";

export type TOptions = {
  method: METHOD;
  data?: XMLHttpRequestBodyInit | null;
  headers?: Record<string, string>;
};

type TOptionsWithoutMethod = Omit<TOptions, "method">;

export type TRequest = (url: string, options?: TOptionsWithoutMethod) => Promise<XMLHttpRequest>;
