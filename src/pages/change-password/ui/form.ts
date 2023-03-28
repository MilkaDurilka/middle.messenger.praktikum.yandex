import { Button, Input } from "../../../shared/components";
import template from "./template.hbs";
import { Block } from "../../../shared/utils/block";
import type { TChangePasswordFormProps } from "./types";

export class ChangePasswordForm extends Block<TChangePasswordFormProps> {
  constructor() {
    super({
      events: {
        submit: (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());
          console.log("ChangePasswordForm form: ", values);
        },
      },
      inputOldPassword: new Input({
        id: "oldPassword",
        name: "oldPassword",
        placeholder: "Old password",
        label: "Old password",
        type: "password",
      }),
      inputNewPassword: new Input({
        id: "newPassword",
        name: "newPassword",
        placeholder: "New password",
        label: "New password",
        type: "password",
      }),
      inputConfirmPassword: new Input({
        id: "confirmPassword",
        name: "confirmPassword",
        placeholder: "Confirm password",
        label: "Confirm password",
        type: "password",
      }),
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
