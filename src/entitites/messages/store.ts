import { withStore } from "../../shared/utils/store";
import type { TMessageBlock } from "../../pages/chat/types";
import { hasKey } from "../../shared/utils/object";

export const withMessages = withStore((state) => {
  const messages: TMessageBlock[] = [];

  if (
    !state.selectedChatId ||
    !state.messages ||
    !hasKey(state.messages, state.selectedChatId)
  ) {
    return { messages: [] };
  }

  messages.push({
    date: new Date(), // TODO: группировать сообщения по датам
    messages: state.messages[state.selectedChatId].map((item) => ({
      ...item,
      date: new Date(item.time),
    })),
  });
  return { messages };
});
