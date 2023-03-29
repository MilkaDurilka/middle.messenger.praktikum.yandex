import type { ObjectSchema } from "yup";
import { object, string } from "yup";
import { Button, Input, Link } from "../../../shared/components";
import template from "./template.hbs";
import type { TProfileFormProps, TProfileForm } from "./types";
import { ROUTES } from "../../../shared/router/constants";
import { loginRegexp, nameRegexp, phoneRegexp } from "../../../shared/utils/regexp";
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

const profileSchema: ObjectSchema<TProfileForm> = object({
  [EForm.email]: string().required().email(),
  [EForm.login]: string().required().min(3).max(8).matches(loginRegexp),
  [EForm.firstName]: string().required().matches(nameRegexp),
  [EForm.secondName]: string().required().matches(nameRegexp),
  [EForm.displayName]: string().required(),
  [EForm.phone]: string().required().min(10).max(15).matches(phoneRegexp),
});

export class ProfileForm extends Form<TProfileFormProps, typeof formElements, TProfileForm> {
  constructor() {
    super({
      schema: profileSchema,
      formElements,
      linkChangePassword: new Link({ text: "Change password", href: ROUTES.changePassword }),
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
