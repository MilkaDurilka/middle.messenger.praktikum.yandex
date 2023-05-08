import type { METHOD } from "./utils";

export type TOptions = {
  method: METHOD;
  data?: unknown;
  headers?: Record<string, string>;
};

type TOptionsWithoutMethod = Omit<TOptions, "method">;

export type TRequest = <Response>(
  path: string,
  options?: TOptionsWithoutMethod
) => Promise<Response>;
