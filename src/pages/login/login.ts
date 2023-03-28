import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import type { TLoginProps, TLoginBlockProps } from "./types";
import { LoginForm } from "./ui";

export class LoginPage extends Block<TLoginBlockProps> {
  constructor(props: TLoginProps) {
    super({
      ...props,
      form: new LoginForm(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
