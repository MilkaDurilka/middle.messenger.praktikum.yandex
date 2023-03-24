import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TInputProps, TInputBlockProps } from "./types";
import { Icon } from "../icon";

export class Input extends Block<TInputBlockProps> {
  constructor(props: TInputProps) {
    super({ type: "text", ...props, iconError: new Icon({ name: "error", width: 16 }) });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
