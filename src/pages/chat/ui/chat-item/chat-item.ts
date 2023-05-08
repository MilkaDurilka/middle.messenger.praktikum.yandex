import { format } from "date-fns";
import { ru } from "date-fns/locale";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import { Block } from "../../../../shared/utils/block";
import type { TChatItemProps, TChatItemBlockProps } from "./types";
import { Avatar } from "../../../../shared/components";

export class ChatItem extends Block<TChatItemBlockProps> {
  constructor(props: TChatItemProps) {
    super({
      ...props,
      date: props.date
        ? format(new Date(props.date), "hh:mm", { locale: ru })
        : "",
      avatar: new Avatar({ src: props.avatarSrc }),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
