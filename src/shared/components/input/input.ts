import { ValidationError } from "yup";
import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TInputProps, TInputBlockProps } from "./types";
import { Icon } from "../icon";
import { PlainInput } from "./ui";

export class Input extends Block<TInputBlockProps> {
  constructor(props: TInputProps) {
    const { id, name, type, disabled, placeholder, value, label, validateScheme } = props;
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
          blur: async (e) => {
            if (validateScheme) {
              try {
                await validateScheme.validate(e.target.value);
              } catch (err) {
                if (err instanceof ValidationError) {
                  this.setProps({ error: err.message });
                }
              }
            }
          },
          focus: () => {
            if (this.props.error) {
              this.setProps({ error: undefined });
            }
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
