import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Link, Button, InputImg } from "../../shared/components";
import type { TProfileBlockProps } from "./types";
import { ProfileForm } from "./ui";

export class ProfilePage extends Block<TProfileBlockProps> {
  constructor() {
    super({
      title: "Profile",
      linkBack: new Link({ text: "Back", isBack: true }),
      buttonLogout: new Button({
        text: "Logout",
        danger: true,
      }),
      inputAvatar: new InputImg({
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
