import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import type { TLoginBlockProps } from "./types";
import { LoginForm } from "./ui";

export class LoginPage extends Block<TLoginBlockProps> {
  constructor() {
    super({
      title: "Log in",
      form: new LoginForm(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
