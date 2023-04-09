import type { Block } from "./block";

export type TCallback = (...args: any[]) => void;

export type TBlockProps<T = Record<string, unknown>> = T & {
  events?: Record<string, TCallback>;
  style?: any;
  __id?: string;
};

export type TBlockChildren = Record<string, Block | Block[]>;

export type TStubs = Record<string, string>;

export interface IBlockConstructor {
  new (): Block;
}
