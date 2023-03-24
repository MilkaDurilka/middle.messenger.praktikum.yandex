import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Button, Input, Link } from "../../shared/components";
import type { TChangePasswordBlockProps, TChangePasswordProps } from "./types";

export class ChangePasswordPage extends Block<TChangePasswordBlockProps> {
  constructor(props: TChangePasswordProps) {
    super({
      ...props,
      linkBack: new Link({ text: "Back", href: "#" }),
      buttonLogout: new Button({
        text: "Logout",
        danger: true,
      }),
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
