import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Button, Link } from "../../shared/components";
import type { TChangePasswordBlockProps, TChangePasswordProps } from "./types";
import { ChangePasswordForm } from "./ui";

export class ChangePasswordPage extends Block<TChangePasswordBlockProps> {
  constructor(props: TChangePasswordProps) {
    super({
      ...props,
      linkBack: new Link({ text: "Back", href: "#" }),
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
