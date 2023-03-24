import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import { Button } from "../button";
import type { TInputImg, TInputBlockImg } from "./types";

export class InputImg extends Block<TInputBlockImg> {
  constructor(props: TInputImg) {
    super({
      ...props,
      button: new Button({
        text: "Change avatar",
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
