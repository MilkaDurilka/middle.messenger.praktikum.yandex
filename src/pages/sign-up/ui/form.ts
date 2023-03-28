import { Button, Input, Link } from "../../../shared/components";
import template from "./template.hbs";
import { Block } from "../../../shared/utils/block";
import type { TSignUpFormProps } from "./types";
import { ROUTES } from "../../../shared/router/constants";

export class SignUpForm extends Block<TSignUpFormProps> {
  constructor() {
    super({
      events: {
        submit: (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());
          console.log("Sign Up form: ", values);
        },
      },
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
      linkLogIn: new Link({ text: "Log in", href: ROUTES.login }),
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
