import type { TMessage } from "../../../../entitites/messages";
import type { TUserState } from "../../../../entitites/user/types";

export type TDayMessageProps = {
  date: Date;
  messages: TMessage[];
  user: TUserState;
};
