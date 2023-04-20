import { Button, Input, Form } from "../../../shared/components";
import template from "./template.hbs";
import type { TSchema } from "./types";
import { EForm } from "./types";
import {
  Validation,
  getValidationSchema,
} from "../../../shared/utils/validation";
import type { TChangePasswordData } from "../../../entitites/user/types";
import { userController } from "../../../entitites/user";

const changePasswordSchema = getValidationSchema<TSchema>({
  [EForm.oldPassword]: Validation.stringRequired(),
  [EForm.newPassword]: Validation.password(),
  [EForm.confirmPassword]: Validation.confirmPassword(EForm.newPassword),
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

export class ChangePasswordForm extends Form {
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

  onSubmit(data: TChangePasswordData) {
    return userController.changePassword(data);
  }

  render() {
    return this.compile(template, this.props);
  }
}
