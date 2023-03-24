import template from "./template.hbs";
import type { TListItemProps } from "./types";
import { Block } from "../../utils/block";

export class ListItem extends Block<TListItemProps> {
  render() {
    return this.compile(template, this.props);
  }
}
