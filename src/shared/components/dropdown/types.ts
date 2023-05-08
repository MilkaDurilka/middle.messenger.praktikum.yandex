import type { TIconName } from "../icon";

type TContentItem = {
  text?: string;
  icon?: TIconName;
  onClick: () => void;
};
export type TDropdownProps = {
  icon: TIconName;
  content: TContentItem[];
};
