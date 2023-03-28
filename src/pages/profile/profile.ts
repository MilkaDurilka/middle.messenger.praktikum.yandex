import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Link, Button, InputImg } from "../../shared/components";
import type { TProfileProps, TProfileBlockProps } from "./types";
import { ProfileForm } from "./ui";

export class ProfilePage extends Block<TProfileBlockProps> {
  constructor(props: TProfileProps) {
    super({
      ...props,
      linkBack: new Link({ text: "Back", href: "#" }),
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
