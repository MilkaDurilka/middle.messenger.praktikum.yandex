import type { TIconName } from "../icon";
import type { Block } from "../../utils/block";

export type TErrorLayoutProps = {
  iconName: TIconName;
  title: string;
  description?: string;
  linkText: string;
  linkUrl: string;
};

export type TErrorLayoutBlock = TErrorLayoutProps & {
  link: Block;
  icon: Block;
};
