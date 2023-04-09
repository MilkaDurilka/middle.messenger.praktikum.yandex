import { Button, Input, Link } from "../../../shared/components";
import template from "./template.hbs";
import type { TProfileForm, TProfileFormProps } from "./types";
import { EForm } from "./types";
import { ROUTES } from "../../../shared/router";
import { Form } from "../../../shared/components/form";
import { getValidationSchema, Validation } from "../../../shared/utils/validation";

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

const inputDisplayName = new Input({
  id: EForm.displayName,
  name: EForm.displayName,
  placeholder: "Nickname",
  label: "Nickname",
});

const inputPhone = new Input({
  id: EForm.phone,
  name: EForm.phone,
  placeholder: "Phone",
  label: "Phone",
});

const formElements = {
  [EForm.email]: inputEmail,
  [EForm.login]: inputLogin,
  [EForm.firstName]: inputFirstName,
  [EForm.secondName]: inputSecondName,
  [EForm.displayName]: inputDisplayName,
  [EForm.phone]: inputPhone,
};

const profileSchema = getValidationSchema<TProfileForm>({
  [EForm.email]: Validation.email(),
  [EForm.login]: Validation.login(),
  [EForm.firstName]: Validation.name(),
  [EForm.secondName]: Validation.name(),
  [EForm.displayName]: Validation.stringRequired(),
  [EForm.phone]: Validation.phone(),
});

export class ProfileForm extends Form<TProfileFormProps, typeof formElements, TProfileForm> {
  constructor() {
    super({
      schema: profileSchema,
      formElements,
      linkChangePassword: new Link({
        text: "Change password",
        to: ROUTES.changePassword,
      }),
      buttonSubmit: new Button({
        type: "submit",
        text: "Edit",
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
