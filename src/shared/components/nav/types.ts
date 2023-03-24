import type { Block } from "../../utils/block";

type TNav = {
  name: string;
  path: string;
};

export type TNavProps = {
  navs: TNav[];
};

export type TNavBlockProps = {
  navs: Block[];
};
