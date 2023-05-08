import template from "./template.hbs";
import * as style from "./style.module.scss";
import { Button, Input, Form } from "../../../../shared/components";
import type { TInputImg } from "./types";
import { userController } from "../../../../entitites/user";
import { withUser } from "../../../../entitites/user/store";

const button = new Button({
  type: "submit",
});

const input = new Input({
  type: "file",
  id: "avatar",
  name: "avatar",
  accept: "image/*",
  events: {
    change: () => button.submit(),
  },
});

class AvatarFormBase extends Form<TInputImg> {
  constructor(props: TInputImg) {
    super({
      ...props,
      isFormData: true,
      input,
      button,
    });
  }

  onSubmit(data: { avatar: string }) {
    return userController.updateAvatar(data);
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}

export const AvatarForm = withUser(AvatarFormBase);
