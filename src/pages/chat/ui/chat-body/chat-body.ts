import template from "./template.hbs";
import { Block } from "../../../../shared/utils/block";
import type { TChatBodyProps, TChatBodyBlock } from "./types";
import * as style from "./style.module.scss";
import { DayMessages } from "../day-messages";

export class ChatBody extends Block<TChatBodyBlock> {
  constructor(props: TChatBodyProps) {
    super({
      ...props,
      messages: props.messages.map((item) => new DayMessages({ ...item })),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
