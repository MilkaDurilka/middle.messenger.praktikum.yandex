import { Block } from "../../utils/block";
import type { TButtonProps } from "./types";
import template from "./template.hbs";
import * as style from "./style.module.scss";

export class Button extends Block<TButtonProps> {
  constructor(props: TButtonProps) {
    super({ type: "button", ...props });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
