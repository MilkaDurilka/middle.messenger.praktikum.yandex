import type { Block } from "../../../../shared/utils/block";

export type TChatHeaderProps = {
  chatId: number;
  avatar?: string;
  title: string;
};

export type TChatHeaderBlock = {
  chatId: number;
  title: string;
  avatar: Block;
  menu: Block;
};
