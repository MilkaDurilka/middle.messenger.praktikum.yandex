import type { icons } from "./icons";

export type TIconName = keyof typeof icons;

export type TIconProps = {
  name: TIconName;
  width: number;

  classStyle?: unknown;
};
