import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Input, Link, Button } from "../../shared/components";
import type { TLoginProps, TLoginBlockProps } from "./types";

export class LoginPage extends Block<TLoginBlockProps> {
  constructor(props: TLoginProps) {
    super({
      ...props,
      inputLogin: new Input({
        id: "login",
        name: "login",
        placeholder: "Login",
        label: "Login",
      }),
      inputPassword: new Input({
        id: "password",
        name: "password",
        placeholder: "Password",
        label: "Password",
        type: "password",
      }),
      linkSignUp: new Link({ text: "Sign up", href: "#" }),
      buttonSubmit: new Button({
        type: "submit",
        text: "Log in",
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
