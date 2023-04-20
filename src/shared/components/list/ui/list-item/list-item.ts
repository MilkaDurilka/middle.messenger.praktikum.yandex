import template from "./template.hbs";
import { Block } from "../../../../utils/block";
import type { TListItemProps } from "../../types";
import { Icon } from "../../../icon";
import * as style from "./style.module.scss";

export class ListItem extends Block {
  constructor({ icon, text, onClick }: TListItemProps) {
    super({
      icon: icon ? new Icon({ name: icon, width: 24 }) : undefined,
      text,
      events: {
        click: (e) => {
          e.stopPropagation();
          onClick();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
