import type { Schema } from "yup";
import type { Block, TBlockProps } from "../../utils/block";

export type TInputProps = {
  id: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  type?: "text" | "number" | "password";
  name: string;
  placeholder?: string;
  value?: string;
  validateScheme?: Schema<any>;
} & Pick<TBlockProps, "events">;

export type TInputBlockProps = Pick<TInputProps, "id" | "disabled" | "label" | "error"> & {
  iconError: Block;
  input: Block;
};
