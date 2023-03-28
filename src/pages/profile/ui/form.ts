import { Button, Input, Link } from "../../../shared/components";
import template from "./template.hbs";
import { Block } from "../../../shared/utils/block";
import type { TProfileFormProps } from "./types";
import { ROUTES } from "../../../shared/router/constants";

export class ProfileForm extends Block<TProfileFormProps> {
  constructor() {
    super({
      events: {
        submit: (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());
          console.log("Profile form: ", values);
        },
      },
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
      linkChangePassword: new Link({ text: "Change password", href: ROUTES.changePassword }),
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
