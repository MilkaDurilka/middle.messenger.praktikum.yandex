import type { Block } from "../../utils/block";

export type TInputProps = {
  label?: string;
  id: string;
  error?: string;
  disabled?: boolean;
  type?: "text" | "number" | "password";
  name: string;
  placeholder?: string;
  value?: string;
};

export type TInputBlockProps = TInputProps & {
  iconError: Block;
};
