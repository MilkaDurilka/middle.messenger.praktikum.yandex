import type { Block, TBlockProps } from "../../utils/block";

type TOption = {
  value: number | string;
  text: string;
};
export type TPlainSelectProps = {
  id: string;
  disabled?: boolean;
  name: string;
  multiple?: boolean;
  options: TOption[];
} & Pick<TBlockProps, "events">;

export type TSelectProps = TPlainSelectProps & {
  options: TOption[];
  label?: string;
  error?: string;
} & Pick<TBlockProps, "events">;

export type TSelectBlockProps = Pick<
  TSelectProps,
  "id" | "disabled" | "label" | "error"
> & {
  iconError: Block;
  select: Block;
};
