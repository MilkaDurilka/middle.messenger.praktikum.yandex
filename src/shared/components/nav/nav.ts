import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TNavProps, TNavBlockProps } from "./types";
import { Link } from "../link";
import { ListItem } from "../list-item";

export class Nav extends Block<TNavBlockProps> {
  constructor(props: TNavProps) {
    const navs = props.navs
      .map(({ name, path }) => new Link({ text: name, to: path }))
      .map((link) => new ListItem({ content: link }));
    super({ navs });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
