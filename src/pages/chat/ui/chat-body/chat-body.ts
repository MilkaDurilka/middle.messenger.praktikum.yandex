import template from "./template.hbs";
import { Block } from "../../../../shared/utils/block";
import type { TChatBodyProps } from "./types";
import * as style from "./style.module.scss";
import { DayMessages } from "../day-messages";
import { withMessages } from "../../../../entitites/messages";

class ChatBodyBase extends Block<TChatBodyProps> {
  init() {
    this.children.messages = this.props.messages.map(
      (item) => new DayMessages({ ...item })
    );
  }

  updated(oldProps: TChatBodyProps, newProps: TChatBodyProps): boolean {
    const needUpdate = super.updated(oldProps, newProps);

    if (needUpdate) {
      this.children.messages = this.props.messages.map(
        (item) => new DayMessages({ ...item })
      );
    }
    return needUpdate;
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}

export const ChatBody = withMessages(ChatBodyBase);
