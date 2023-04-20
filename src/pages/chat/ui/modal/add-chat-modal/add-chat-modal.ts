import { Button, Form, Input, modal } from "../../../../../shared/components";
import template from "./template.hbs";
import { chatController } from "../../../../../entitites/chat";
import {
  getValidationSchema,
  Validation,
} from "../../../../../shared/utils/validation";

enum EForm {
  title = "title",
}
const schema = getValidationSchema({
  [EForm.title]: Validation.name(),
});

export class AddChatModal extends Form {
  constructor() {
    super({
      schema,
      formElements: {
        title: new Input({
          id: EForm.title,
          name: EForm.title,
          placeholder: "Title",
          label: "Title",
        }),
        buttonSubmit: new Button({
          type: "submit",
          text: "Create",
        }),
      },
    });
  }

  async onSubmit({ title }: { title: string }) {
    await chatController.create(title);
    modal.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
