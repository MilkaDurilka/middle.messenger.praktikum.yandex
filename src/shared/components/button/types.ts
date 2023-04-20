import type { Block, TBlockProps } from "../../utils/block";

export type TButtonProps = {
  text?: string;
  icon?: Block;
  type?: "button" | "submit";
  danger?: boolean;
  events?: TBlockProps["events"];
};
