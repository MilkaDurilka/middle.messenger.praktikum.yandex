import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Button, Link } from "../../shared/components";
import type { TChangePasswordBlockProps } from "./types";
import { ChangePasswordForm } from "./ui";
import { authController } from "../../processes/auth";
import { ROUTES } from "../../shared/router";

export class ChangePasswordPage extends Block<TChangePasswordBlockProps> {
  constructor() {
    super({
      title: "Change password",
      linkBack: new Link({
        text: "Back",
        to: ROUTES.chat,
      }),
      buttonLogout: new Button({
        text: "Logout",
        danger: true,
        events: {
          click: () => {
            authController.logout();
          },
        },
      }),
      form: new ChangePasswordForm(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
