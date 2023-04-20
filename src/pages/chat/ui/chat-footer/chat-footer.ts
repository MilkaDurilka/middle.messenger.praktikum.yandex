import template from "./template.hbs";
import type { TChatFooterSchema, TChatFooterProps } from "./types";
import { Button, Icon, Form } from "../../../../shared/components";
import * as style from "./style.module.scss";
import {
  Validation,
  getValidationSchema,
} from "../../../../shared/utils/validation";
import { messageController } from "../../../../entitites/messages";
import { withSelectedChatId } from "../../../../entitites/chat";

const messageSchema = getValidationSchema<TChatFooterSchema>({
  message: Validation.stringRequired(),
});

class ChatFooterBase extends Form<TChatFooterProps> {
  constructor(props: TChatFooterProps) {
    super({
      ...props,
      schema: messageSchema,
      linkButton: new Button({
        icon: new Icon({ name: "link", width: 24 }),
      }),
      submitButton: new Button({
        type: "submit",
        icon: new Icon({ name: "arrow", width: 24, classStyle: style.submit }),
      }),
    });
  }

  onSubmit({ message }: { message: string }) {
    const id = this.props.selectedChatId;
    if (id) {
      messageController.sendMessage(id, message);
    }
    (this.element as HTMLFormElement)?.reset();
  }

  render() {
    return this.compile(template, { style });
  }
}

export const ChatFooter = withSelectedChatId(ChatFooterBase);
