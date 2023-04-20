import type { TMessage } from "../../entitites/messages";

export type TMessageBlock = {
  date: Date;
  messages: TMessage[];
};
