import type { ObjectSchema } from "yup";
import { object, ref, string } from "yup";
import { Button, Input } from "../../../shared/components";
import template from "./template.hbs";
import type { TTemplateBlockProps, TSchema } from "./types";
import { passwordRegexp } from "../../../shared/utils/regexp";
import { Form } from "../../../shared/components/form";
import { EForm } from "./types";
import { localeValidation } from "../../../shared/utils/locale";

const changePasswordSchema: ObjectSchema<TSchema> = object({
  [EForm.oldPassword]: string().required(),
  [EForm.newPassword]: string().required().min(8).max(40).matches(passwordRegexp, {
    message: localeValidation.passwordRegexp,
  }),
  [EForm.confirmPassword]: string()
    .required()
    .oneOf([ref(EForm.newPassword)]),
});

const inputOldPassword = new Input({
  id: EForm.oldPassword,
  name: EForm.oldPassword,
  placeholder: "Old password",
  label: "Old password",
  type: "password",
});

const inputNewPassword = new Input({
  id: EForm.newPassword,
  name: EForm.newPassword,
  placeholder: "New password",
  label: "New password",
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
  [EForm.oldPassword]: inputOldPassword,
  [EForm.newPassword]: inputNewPassword,
  [EForm.confirmPassword]: inputConfirmPassword,
};

type TFormElements = typeof formElements;
export class ChangePasswordForm extends Form<TTemplateBlockProps, TFormElements, TSchema> {
  constructor() {
    super({
      schema: changePasswordSchema,
      formElements,
      buttonSubmit: new Button({
        type: "submit",
        text: "Save",
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
