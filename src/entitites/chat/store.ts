import { withStore } from "../../shared/utils/store";
import type { TWithChats, TWithSelectedChatId } from "./types";

export const withChats = withStore(
  (state): TWithChats => ({
    chats: state.chats,
    selectedChat: state.chats.data?.find(
      (chat) => chat.id === state.selectedChatId
    ),
  })
);

export const withSelectedChatId = withStore(
  (state): TWithSelectedChatId => ({
    selectedChatId: state.selectedChatId,
  })
);
