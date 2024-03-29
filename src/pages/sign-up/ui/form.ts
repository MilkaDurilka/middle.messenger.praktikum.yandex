import { Button, Input, Link, Form } from "../../../shared/components";
import template from "./template.hbs";
import type { TSignUpForm } from "./types";
import { EForm } from "./types";
import { ROUTES } from "../../../shared/router";
import {
  getValidationSchema,
  Validation,
} from "../../../shared/utils/validation";
import type { TSignupData } from "../../../processes/auth";
import { authController } from "../../../processes/auth";

const inputEmail = new Input({
  id: EForm.email,
  name: EForm.email,
  placeholder: "Email",
  label: "Email",
});

const inputLogin = new Input({
  id: EForm.login,
  name: EForm.login,
  placeholder: "Login",
  label: "Login",
});

const inputFirstName = new Input({
  id: EForm.firstName,
  name: EForm.firstName,
  placeholder: "First Name",
  label: "First Name",
});

const inputSecondName = new Input({
  id: EForm.secondName,
  name: EForm.secondName,
  placeholder: "Second Name",
  label: "Second Name",
});

const inputPhone = new Input({
  id: EForm.phone,
  name: EForm.phone,
  placeholder: "Phone",
  label: "Phone",
});

const inputPassword = new Input({
  id: EForm.password,
  name: EForm.password,
  placeholder: "Password",
  label: "Password",
  type: "password",
});

const inputConfirmPassword = new Input({
  id: EForm.confirmPassword,
  name: EForm.confirmPassword,
  placeholder: "Confirm password",
  label: "Confirm password",
  type: "password",
});

const formElements = {
  [EForm.email]: inputEmail,
  [EForm.login]: inputLogin,
  [EForm.firstName]: inputFirstName,
  [EForm.secondName]: inputSecondName,
  [EForm.phone]: inputPhone,
  [EForm.password]: inputPassword,
  [EForm.confirmPassword]: inputConfirmPassword,
};

const signUpSchema = getValidationSchema<TSignUpForm>({
  [EForm.email]: Validation.email(),
  [EForm.login]: Validation.login(),
  [EForm.firstName]: Validation.name(),
  [EForm.secondName]: Validation.name(),
  [EForm.phone]: Validation.phone(),
  [EForm.password]: Validation.password(),
  [EForm.confirmPassword]: Validation.confirmPassword(EForm.password),
});

export class SignUpForm extends Form {
  constructor() {
    super({
      schema: signUpSchema,
      formElements,
      linkLogIn: new Link({ text: "Log in", to: ROUTES.login }),
      buttonSubmit: new Button({
        type: "submit",
        text: "Sign up",
      }),
    });
  }

  onSubmit(data: TSignupData) {
    authController.signup(data);
  }

  render() {
    return this.compile(template, this.props);
  }
}
