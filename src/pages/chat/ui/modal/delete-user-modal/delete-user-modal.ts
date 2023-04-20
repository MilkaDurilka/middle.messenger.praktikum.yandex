import { Button, Form, modal, Select } from "../../../../../shared/components";
import template from "./template.hbs";
import {
  getValidationSchema,
  Validation,
} from "../../../../../shared/utils/validation";
import { chatController } from "../../../../../entitites/chat";
import { hasKey } from "../../../../../shared/utils/object";
import type { TDeleteUserForm, TDeleteUserModalProps } from "./types";
import { EForm } from "./types";

const schema = getValidationSchema<TDeleteUserForm>({
  [EForm.usersIds]: Validation.array(),
});

export class DeleteUserModal extends Form<TDeleteUserModalProps> {
  constructor(props: TDeleteUserModalProps) {
    const formElements = {
      [EForm.usersIds]: new Select({
        id: EForm.usersIds,
        name: EForm.usersIds,
        label: "Users",
        multiple: true,
        options: [],
      }),
    };
    super({
      chatId: props.chatId,
      schema,
      formElements,
      buttonSubmit: new Button({
        type: "submit",
        text: "Delete",
      }),
    });
  }

  async init() {
    const users = await chatController.getUsers(this.props.chatId);

    const options = users.map((user) => ({
      value: user.id,
      text: user.login,
    }));

    if (hasKey(this.children, EForm.usersIds)) {
      this.getChildren(EForm.usersIds)?.setProps({ options });
    }
  }

  async onSubmit({ usersIds }: { usersIds: string[] }) {
    await chatController.deleteUsers(this.props.chatId, usersIds);
    modal.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
