import type { TIconName } from "../icon";

export type TListItemProps = {
  text?: string;
  icon?: TIconName;
  onClick: () => void;
};

export type TListProps = {
  items: TListItemProps[];
};
