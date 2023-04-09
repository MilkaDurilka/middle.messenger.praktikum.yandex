import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TErrorLayoutProps, TErrorLayoutBlock } from "./types";
import { Link } from "../link";
import { Icon } from "../icon";

export class ErrorLayout extends Block<TErrorLayoutBlock> {
  constructor(props: TErrorLayoutProps) {
    super({
      ...props,
      icon: new Icon({ name: props.iconName, width: 255 }),
      link: new Link({ text: props.linkText, href: props.linkUrl }),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
