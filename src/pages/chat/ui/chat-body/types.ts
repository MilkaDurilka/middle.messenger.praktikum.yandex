import type { TMessageBlock } from "../../types";
import type { Block } from "../../../../shared/utils/block";

export type TChatBodyProps = {
  messages: TMessageBlock[];
};

export type TChatBodyBlock = {
  messages: Block[];
};
