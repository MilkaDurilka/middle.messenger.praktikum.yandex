import type { Block } from "../../utils/block";

export type TButtonProps = {
  text?: string;
  icon?: Block;
  type?: "button" | "submit";
  danger?: boolean;
};
