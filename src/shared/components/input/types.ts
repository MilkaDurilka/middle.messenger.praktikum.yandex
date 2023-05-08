import type { Block, TBlockProps } from "../../utils/block";

export type TPlainInputProps = {
  id: string;
  disabled?: boolean;
  type?: "text" | "number" | "password" | "file";
  name: string;
  accept?: string;
  placeholder?: string;
  value?: string;
} & Pick<TBlockProps, "events">;

export type TInputProps = TPlainInputProps & {
  label?: string;
  error?: string;
} & Pick<TBlockProps, "events">;

export type TInputBlockProps = Pick<
  TInputProps,
  "id" | "disabled" | "label" | "error"
> & {
  iconError: Block;
  input: Block;
};
