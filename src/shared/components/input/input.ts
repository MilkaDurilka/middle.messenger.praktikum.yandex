import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TInputProps, TInputBlockProps } from "./types";
import { Icon } from "../icon";
import { PlainInput } from "./ui";

export class Input extends Block<TInputBlockProps> {
  constructor(props: TInputProps) {
    const {
      id,
      name,
      type,
      disabled,
      placeholder,
      value,
      label,
      events,
      accept,
    } = props;
    super({
      id,
      disabled,
      label,
      inputEl: new PlainInput({
        id,
        name,
        type,
        disabled,
        placeholder,
        value,
        events,
        accept,
      }),
      iconError: new Icon({ name: "error", width: 16 }),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
