import type { ObjectSchema } from "yup";
import { object, ref, string } from "yup";
import { Button, Input, Link } from "../../../shared/components";
import template from "./template.hbs";
import type { TSignUpFormProps, TSignUpForm } from "./types";
import { ROUTES } from "../../../shared/router/constants";
import { loginRegexp, nameRegexp, passwordRegexp, phoneRegexp } from "../../../shared/utils/regexp";
import { Form } from "../../../shared/components/form";
import { EForm } from "./types";

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

const signUpSchema: ObjectSchema<TSignUpForm> = object({
  [EForm.email]: string().required().email(),
  [EForm.login]: string().required().min(3).max(8).matches(loginRegexp),
  [EForm.firstName]: string().required().matches(nameRegexp),
  [EForm.secondName]: string().required().matches(nameRegexp),
  [EForm.phone]: string().required().min(10).max(15).matches(phoneRegexp),
  [EForm.password]: string().required().min(8).max(40).matches(passwordRegexp),
  [EForm.confirmPassword]: string()
    .required()
    .oneOf([ref(EForm.password)]),
});

export class SignUpForm extends Form<TSignUpFormProps, typeof formElements, TSignUpForm> {
  constructor() {
    super({
      schema: signUpSchema,
      formElements,
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
