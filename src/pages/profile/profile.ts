import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Input, Link, Button, InputImg } from "../../shared/components";
import type { TProfileProps, TProfileBlockProps } from "./types";

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
      inputEmail: new Input({
        id: "email",
        name: "email",
        placeholder: "Email",
        label: "Email",
      }),
      inputLogin: new Input({
        id: "login",
        name: "login",
        placeholder: "Login",
        label: "Login",
      }),
      inputFirstName: new Input({
        id: "first_name",
        name: "first_name",
        placeholder: "First Name",
        label: "First Name",
      }),
      inputSecondName: new Input({
        id: "second_name",
        name: "second_name",
        placeholder: "Second Name",
        label: "Second Name",
      }),
      inputNickname: new Input({
        id: "display_name",
        name: "display_name",
        placeholder: "Nickname",
        label: "Nickname",
      }),
      inputPhone: new Input({
        id: "phone",
        name: "phone",
        placeholder: "Phone",
        label: "Phone",
      }),
      linkChangePassword: new Link({ text: "Change password", href: "#" }),
      buttonSubmit: new Button({
        type: "submit",
        text: "Edit",
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
