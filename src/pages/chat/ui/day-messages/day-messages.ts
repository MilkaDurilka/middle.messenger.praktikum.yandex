import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Block } from "../../../../shared/utils/block";
import type { TDayMessageProps } from "./types";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import { Message } from "../message";
import { withUser } from "../../../../entitites/user/store";

export class DayMessagesBase extends Block {
  constructor(props: TDayMessageProps) {
    super({
      time: format(props.date, "dd MMMM", { locale: ru }),
      messages: props.messages.map(
        (item) =>
          new Message({
            isMine: item.user_id === props.user.data?.id,
            date: item.date,
            text: item.content,
          })
      ),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}

// @ts-ignore
export const DayMessages = withUser(DayMessagesBase);
