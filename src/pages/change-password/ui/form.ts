import type { ObjectSchema } from "yup";
import { object, ref, string } from "yup";
import { Button, Input } from "../../../shared/components";
import template from "./template.hbs";
import type { TTemplateBlockProps, TSchema } from "./types";
import { passwordRegexp } from "../../../shared/utils/regexp";
import { Form } from "../../../shared/components/form";
import { EForm } from "./types";

const formValidate = {
  [EForm.oldPassword]: string().required(),
  [EForm.newPassword]: string().required().min(8).max(40).matches(passwordRegexp),
  [EForm.confirmPassword]: string()
    .required()
    .oneOf([ref(EForm.newPassword)]),
};

const inputOldPassword = new Input({
  id: EForm.oldPassword,
  name: EForm.oldPassword,
  placeholder: "Old password",
  label: "Old password",
  type: "password",
  validateScheme: formValidate.oldPassword,
});

const inputNewPassword = new Input({
  id: EForm.newPassword,
  name: EForm.newPassword,
  placeholder: "New password",
  label: "New password",
  type: "password",
  validateScheme: formValidate.newPassword,
});

const inputConfirmPassword = new Input({
  id: EForm.confirmPassword,
  name: EForm.confirmPassword,
  placeholder: "Confirm password",
  label: "Confirm password",
  type: "password",
  validateScheme: formValidate.confirmPassword,
});

const formElements = {
  [EForm.oldPassword]: inputOldPassword,
  [EForm.newPassword]: inputNewPassword,
  [EForm.confirmPassword]: inputConfirmPassword,
};

const changePasswordSchema: ObjectSchema<TSchema> = object(formValidate);

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
