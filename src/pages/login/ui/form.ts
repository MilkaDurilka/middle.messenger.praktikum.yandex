import type { ObjectSchema } from "yup";
import { object, string } from "yup";
import { Button, Input, Link } from "../../../shared/components";
import template from "./template.hbs";
import type { TLoginForm, TLoginFormBlock } from "./types";
import { EForm } from "./types";
import { ROUTES } from "../../../shared/router/constants";
import { loginRegexp, passwordRegexp } from "../../../shared/utils/regexp";
import { Form } from "../../../shared/components/form";
import { localeValidation } from "../../../shared/utils/locale";

const loginSchema: ObjectSchema<TLoginForm> = object({
  [EForm.login]: string().required().min(3).max(8).matches(loginRegexp, {
    message: localeValidation.loginRegexp,
  }),
  [EForm.password]: string().required().min(8).max(40).matches(passwordRegexp, {
    message: localeValidation.passwordRegexp,
  }),
});

const inputLogin = new Input({
  id: EForm.login,
  name: EForm.login,
  placeholder: "Login",
  label: "Login",
});

const inputPassword = new Input({
  id: EForm.password,
  name: EForm.password,
  placeholder: "Password",
  label: "Password",
  type: "password",
});

const formElements = {
  [EForm.login]: inputLogin,
  [EForm.password]: inputPassword,
};

export class LoginForm extends Form<TLoginFormBlock, typeof formElements, TLoginForm> {
  constructor() {
    super({
      schema: loginSchema,
      formElements,
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
