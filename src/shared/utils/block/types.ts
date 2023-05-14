import type { Block } from "./block";

export type TCallback = (...args: any[]) => void;

export type TBlockProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  events?: Record<string, TCallback>;
  style?: unknown;
  __id?: string;
};

export type TBlockChildren = Record<string, Block | Block[]>;

export type TStubs = Record<string, string>;

export type TBlockConstructor<
  T extends Record<string, unknown> = Record<string, unknown>
> = new (args?: any) => Block<T>;
