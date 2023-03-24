import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Input, Link, Button } from "../../shared/components";
import type { TLoginBlockProps, TLoginProps } from "./types";

export class SignUpPage extends Block<TLoginBlockProps> {
  constructor(props: TLoginProps) {
    super({
      ...props,
      inputEmail: new Input({
        id: "email",
        name: "email",
        placeholder: "Email",
        label: "Email",
      }),
      inputLogin: new Input({
        id: "login",
        name: "login",
        placeholder: "Login",
        label: "Login",
      }),
      inputFirstName: new Input({
        id: "first_name",
        name: "first_name",
        placeholder: "First Name",
        label: "First Name",
      }),
      inputSecondName: new Input({
        id: "second_name",
        name: "second_name",
        placeholder: "Second Name",
        label: "Second Name",
      }),
      inputPhone: new Input({
        id: "phone",
        name: "phone",
        placeholder: "Phone",
        label: "Phone",
      }),
      inputPassword: new Input({
        id: "password",
        name: "password",
        placeholder: "Password",
        label: "Password",
        type: "password",
      }),
      inputConfirmPassword: new Input({
        id: "confirmPassword",
        name: "confirmPassword",
        placeholder: "Confirm password",
        label: "Confirm password",
        type: "password",
      }),
      linkLogIn: new Link({ text: "Log in", href: "#" }),
      buttonSubmit: new Button({
        type: "submit",
        text: "Sign up",
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
