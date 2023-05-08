import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TDropdownProps } from "./types";
import { Block } from "../../utils/block";
import { Button } from "../button";
import { Icon } from "../icon";
import { List } from "../list";

export class Dropdown extends Block {
  constructor(props: TDropdownProps) {
    super({
      isOpen: false,
      button: new Button({
        icon: new Icon({ name: props.icon, width: 24 }),
        events: {
          click: (e) => {
            if (!this.props.isOpen) {
              e.stopPropagation();
            }

            e.preventDefault();
            this.setProps({ isOpen: true });
            document.addEventListener("click", this.closeDropdown);
          },
        },
      }),
      content: new List({ items: props.content }),
    });

    this.closeDropdown = this.closeDropdown.bind(this);
  }

  closeDropdown() {
    this.setProps({ isOpen: false });
    document.removeEventListener("click", this.closeDropdown);
  }

  beforeDestroy() {
    document.removeEventListener("click", this.closeDropdown);
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
