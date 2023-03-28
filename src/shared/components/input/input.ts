import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TInputProps, TInputBlockProps } from "./types";
import { Icon } from "../icon";
import { PlainInput } from "./ui";

export class Input extends Block<TInputBlockProps> {
  constructor(props: TInputProps) {
    const { id, name, type, disabled, placeholder, value, label } = props;
    super({
      id,
      disabled,
      label,
      input: new PlainInput({
        id,
        name,
        type,
        disabled,
        placeholder,
        value,
        events: {
          blur: () => {
            console.log("blur", this.props);
          },
        },
      }),
      iconError: new Icon({ name: "error", width: 16 }),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
