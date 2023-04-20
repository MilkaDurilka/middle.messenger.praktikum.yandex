import type { Block, TBlockProps } from "../../../../shared/utils/block";

export type TChatItemProps = {
  name: string;
  message?: string;
  date?: string;
  avatarSrc?: string;
  count?: number;
  events?: TBlockProps["events"];
};

export type TChatItemBlockProps = TChatItemProps & {
  avatar: Block;
};
