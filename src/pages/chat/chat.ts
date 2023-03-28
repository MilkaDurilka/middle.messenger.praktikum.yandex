import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Input, Link, ChatItem } from "../../shared/components";
import type { TChatBlockProps } from "./types";
import { ROUTES } from "../../shared/router/constants";
import { ChatHeader } from "./ui/chat-header";
import { ChatBody } from "./ui/chat-body";
import { ChatFooter } from "./ui/chat-footer";
import * as style from "./style.module.scss";
import { mockData } from "./mock-data";

export class ChatPage extends Block<TChatBlockProps> {
  constructor() {
    super({
      linkProfile: new Link({ text: "Profile", href: ROUTES.profile }),
      inputSearch: new Input({
        id: "search",
        name: "search",
        placeholder: "Search",
      }),
      chatItem: new ChatItem({
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!...",
        date: "15:12",
        count: 4,
        // avatarSrc: "src",
      }),
      chatHeader: new ChatHeader({
        name: "Вадим",
      }),
      chatBody: new ChatBody({ messages: mockData }),
      chatFooter: new ChatFooter(),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
