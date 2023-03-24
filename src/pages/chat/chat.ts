import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Input, Link, ChatItem } from "../../shared/components";
import type { TChatBlockProps } from "./types";

export class ChatPage extends Block<TChatBlockProps> {
  constructor() {
    super({
      linkProfile: new Link({ text: "Profile", href: "#" }),
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
        avatarSrc: "src",
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
