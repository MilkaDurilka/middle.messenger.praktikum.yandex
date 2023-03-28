import { Button, Input, Link } from "../../../shared/components";
import template from "./template.hbs";
import { Block } from "../../../shared/utils/block";
import type { TLoginFormProps } from "./types";
import { ROUTES } from "../../../shared/router/constants";

export class LoginForm extends Block<TLoginFormProps> {
  constructor() {
    super({
      events: {
        submit: (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());
          console.log("Login form: ", values);
        },
      },
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
      linkSignUp: new Link({ text: "Sign up", href: ROUTES.signup }),
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
