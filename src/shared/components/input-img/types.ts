import type { Block } from "../../utils/block";

export type TInputImg = {
  id: string;
  error?: string;
  disabled?: boolean;
  name: string;
  value?: string;
};

export type TInputBlockImg = TInputImg & {
  button: Block;
};
