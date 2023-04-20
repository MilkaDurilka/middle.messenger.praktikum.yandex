import type { TChatData } from "../../../entitites/chat";
import type { TMessage } from "../../../entitites/messages";
import type { TChatState } from "../../../entitites/chat/types";
import type { TUserState } from "../../../entitites/user/types";
// TODO: исправить импорт из entities в shared ?

export type TState = {
  user: TUserState;
  chats: TChatState;

  messages: Record<number, TMessage[]>;

  selectedChatId?: TChatData["id"];
};
