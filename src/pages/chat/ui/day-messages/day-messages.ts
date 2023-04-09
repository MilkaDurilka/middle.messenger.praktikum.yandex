import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Block } from "../../../../shared/utils/block";
import type { TDayMessageProps } from "./types";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import { Message } from "../message";

const userId = "1";
export class DayMessages extends Block {
  constructor(props: TDayMessageProps) {
    super({
      time: format(props.date, "dd MMMM", { locale: ru }),
      messages: props.messages.map(
        (item) =>
          new Message({ isMine: item.author.id === userId, date: item.date, text: item.text })
      ),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
