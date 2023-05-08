import {
  Button,
  Form,
  Input,
  modal,
  Select,
} from "../../../../../shared/components";
import template from "./template.hbs";
import {
  getValidationSchema,
  Validation,
} from "../../../../../shared/utils/validation";
import { chatController } from "../../../../../entitites/chat";
import { userController } from "../../../../../entitites/user";
import type { TAddUserForm, TAddUserModalProps } from "./types";
import { EForm } from "./types";

const schema = getValidationSchema<TAddUserForm>({
  [EForm.usersIds]: Validation.array(),
});

const formElements = {
  [EForm.usersIds]: new Select({
    id: EForm.usersIds,
    name: EForm.usersIds,
    label: "Users found by login (Hold ctr/shift to select multiple)",
    multiple: true,
    options: [],
  }),
};

export class AddUserModal extends Form<TAddUserModalProps> {
  constructor(props: TAddUserModalProps) {
    super({
      chatId: props.chatId,
      schema,
      login: new Input({
        id: "login",
        name: "login",
        placeholder: "Login",
        label: "Login",
        events: {
          change: async (e) => {
            const users = await userController.searchByLogin(e.target.value);
            const options = users.map((user) => ({
              value: user.id,
              text: user.login,
            }));

            this.getChildren(EForm.usersIds)?.setProps({ options });
          },
        },
      }),
      formElements,
      users: [],
      buttonSubmit: new Button({
        type: "submit",
        text: "Add",
      }),
    });
  }

  init() {
    this.getChildren(EForm.usersIds)?.setProps({ options: [] });
  }

  async onSubmit({ usersIds }: { usersIds: string[] }) {
    await chatController.addUsers(this.props.chatId, usersIds);
    modal.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
