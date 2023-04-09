import type { Block } from "../../shared/utils/block";

export type TLayoutProps = {
  content: Block;
};

export type TLayoutBlock = TLayoutProps & {
  navs: Block;
};
