import template from "./template.hbs";
import type { TListProps } from "./types";
import { Block } from "../../utils/block";
import { ListItem } from "./ui/list-item";
import * as style from "./style.module.scss";

export class List extends Block {
  constructor({ items }: TListProps) {
    super({
      items: items.map(
        (item) =>
          new ListItem({
            ...item,
          })
      ),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
