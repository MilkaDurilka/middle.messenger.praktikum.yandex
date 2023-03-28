import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import type { TLoginBlockProps, TLoginProps } from "./types";
import { SignUpForm } from "./ui";

export class SignUpPage extends Block<TLoginBlockProps> {
  constructor(props: TLoginProps) {
    super({
      ...props,
      form: new SignUpForm(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
