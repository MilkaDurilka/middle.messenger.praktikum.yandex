import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Block } from "../../../../shared/utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TMessageProps, TMessageBlock } from "./types";

export class Message extends Block<TMessageBlock> {
  constructor(props: TMessageProps) {
    super({
      text: props.text,
      time: format(props.date, "hh:mm", { locale: ru }),
      isMine: props.isMine,
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
