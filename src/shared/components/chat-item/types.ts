import type { Block } from "../../utils/block";

export type TChatItemProps = {
  name: string;
  message: string;
  date: string;
  avatarSrc?: string;
  count?: number;
};

export type TChatItemBlockProps = TChatItemProps & {
  avatar: Block;
};
