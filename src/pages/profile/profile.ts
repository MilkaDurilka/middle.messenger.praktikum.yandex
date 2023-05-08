import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Link, Button } from "../../shared/components";
import type { TProfileBlockProps } from "./types";
import { AvatarForm } from "./ui/avatar-form";
import { ProfileForm } from "./ui/profile-form";
import { authController } from "../../processes/auth";
import { ROUTES } from "../../shared/router";

export class ProfilePage extends Block<TProfileBlockProps> {
  constructor() {
    super({
      title: "Profile",
      linkBack: new Link({ text: "Back", to: ROUTES.chat }),
      buttonLogout: new Button({
        text: "Logout",
        danger: true,
        events: {
          click: () => {
            authController.logout();
          },
        },
      }),
      inputAvatar: new AvatarForm({
        id: "avatar",
        name: "avatar",
      }),
      form: new ProfileForm(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
