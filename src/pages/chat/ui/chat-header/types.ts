import type { Block } from "../../../../shared/utils/block";

export type TChatHeaderProps = {
  avatarSrc?: string;
  name: string;
};

export type TChatHeaderBlock = Omit<TChatHeaderProps, "avatar"> & {
  avatar: Block;
  menu: Block;
};
