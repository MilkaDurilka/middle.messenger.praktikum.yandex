import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Button, Link } from "../../shared/components";
import type { TChangePasswordBlockProps } from "./types";
import { ChangePasswordForm } from "./ui";

export class ChangePasswordPage extends Block<TChangePasswordBlockProps> {
  constructor() {
    super({
      title: "Change password",
      linkBack: new Link({
        text: "Back",
        isBack: true,
      }),
      buttonLogout: new Button({
        text: "Logout",
        danger: true,
      }),
      form: new ChangePasswordForm(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
