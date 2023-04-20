import { Button, Input, Link, Form } from "../../../shared/components";
import template from "./template.hbs";
import type { TLoginForm } from "./types";
import { EForm } from "./types";
import { ROUTES } from "../../../shared/router";
import {
  Validation,
  getValidationSchema,
} from "../../../shared/utils/validation";
import type { TSignInData } from "../../../processes/auth";
import { authController } from "../../../processes/auth";

const loginSchema = getValidationSchema<TLoginForm>({
  [EForm.login]: Validation.login(),
  [EForm.password]: Validation.password(),
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

export class LoginForm extends Form {
  constructor() {
    super({
      schema: loginSchema,
      formElements,
      linkSignUp: new Link({ text: "Sign up", to: ROUTES.signup }),
      buttonSubmit: new Button({
        type: "submit",
        text: "Log in",
      }),
    });
  }

  onSubmit(data: TSignInData) {
    authController.signIn(data);
  }

  render() {
    return this.compile(template, this.props);
  }
}
