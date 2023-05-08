import { Block } from "../../../utils/block";
import template from "./template.hbs";
import * as style from "../style.module.scss";
import type { TPlainSelectProps } from "../types";

export class PlainSelect extends Block<TPlainSelectProps> {
  render() {
    return this.compile(template, { ...this.props, style });
  }
}
