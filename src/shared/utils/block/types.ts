import type { Block } from "./block";

export type TCallback = (...args: any[]) => void;

export type TBlockProps = Record<string, unknown> & {
  events?: Record<string, TCallback>;
  settings?: {
    withInternalId: boolean;
  };
  style?: any;
};

export type TBlockChildren = Record<string, Block>;
