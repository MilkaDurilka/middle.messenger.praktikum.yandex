import template from "./template.hbs";
import { Block } from "../../../../shared/utils/block";
import type { TChatHeaderProps, TChatHeaderBlock } from "./types";
import * as style from "./style.module.scss";
import { Avatar, Button, Icon } from "../../../../shared/components";

export class ChatHeader extends Block<TChatHeaderBlock> {
  constructor(props: TChatHeaderProps) {
    super({
      ...props,
      avatar: new Avatar({ src: props.avatarSrc }),
      name: props.name,
      menu: new Button({
        icon: new Icon({ name: "menuPoints", width: 24 }),
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
