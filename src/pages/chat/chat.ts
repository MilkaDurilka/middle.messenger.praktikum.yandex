import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Input, Link, Button, modal } from "../../shared/components";
import { ROUTES } from "../../shared/router";
import { ChatHeader } from "./ui/chat-header";
import { ChatBody } from "./ui/chat-body";
import { ChatFooter } from "./ui/chat-footer";
import { ChatItem } from "./ui/chat-item";
import * as style from "./style.module.scss";
import { chatController, withChats } from "../../entitites/chat";
import { AddChatModal } from "./ui/modal/add-chat-modal";
import type { TChatData } from "../../entitites/chat";
import { store } from "../../shared/utils/store/store";
import type { TWithChats } from "../../entitites/chat/types";

const buildChatItems = (data: TChatData[]): ChatItem[] =>
  data.reduce<ChatItem[]>((acc, chat) => {
    acc.push(
      new ChatItem({
        name: chat.title,
        message: chat.last_message?.content,
        date: chat.last_message?.time,
        count: chat.unread_count,
        avatarSrc: chat.avatar,
        events: {
          click: (e) => {
            e.preventDefault();
            store.set("selectedChatId", chat.id);
          },
        },
      })
    );
    return acc;
  }, []);

class ChatPageBase extends Block<TWithChats> {
  async init() {
    this.children.linkProfile = new Link({
      text: "Profile",
      to: ROUTES.profile,
    });
    this.children.buttonAddChat = new Button({
      text: "Add Chat",
      events: {
        click: () => {
          modal.show({
            title: "Add new chat",
            content: new AddChatModal(),
          });
        },
      },
    });
    this.children.modal = modal;
    this.children.inputSearch = new Input({
      id: "search",
      name: "search",
      placeholder: "Search",
    });
    await chatController.read();
  }

  updated(oldProps: TWithChats, newProps: TWithChats) {
    const res = super.updated(oldProps, newProps);

    if (!res) {
      return false;
    }

    if (newProps.chats.data) {
      const chats = newProps.chats.data;
      this.children.chatItems = buildChatItems(chats);
    }

    if (newProps.selectedChat) {
      const { id, title, avatar } = newProps.selectedChat;
      this.children.chatHeader = new ChatHeader({ chatId: id, title, avatar });
      this.children.chatBody = new ChatBody({});
      this.children.chatFooter = new ChatFooter({});
    }

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}

export const ChatPage = withChats(ChatPageBase);
