import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TLinkProps } from "./types";

export class Link extends Block<TLinkProps> {
  render() {
    return this.compile(template, { ...this.props, style });
  }
}
