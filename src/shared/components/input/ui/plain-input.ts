import { Block } from "../../../utils/block";
import template from "./template.hbs";
import * as style from "../style.module.scss";
import type { TPlainInputProps } from "../types";

export class PlainInput extends Block<TPlainInputProps> {
  constructor(props: TPlainInputProps) {
    super({
      ...props,
      type: props.type || "text",
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
