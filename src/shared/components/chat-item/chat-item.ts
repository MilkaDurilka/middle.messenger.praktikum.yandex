import template from "./template.hbs";
import * as style from "./style.module.scss";
import { Block } from "../../utils/block";
import type { TChatItemProps, TChatItemBlockProps } from "./types";
import { Avatar } from "../avatar";

export class ChatItem extends Block<TChatItemBlockProps> {
  constructor(props: TChatItemProps) {
    super({ ...props, avatar: new Avatar({ src: props.avatarSrc }) });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
