import template from "./template.hbs";
import type { TChatFooterBlock, TChatFooterForm } from "./types";
import { Button, Icon } from "../../../../shared/components";
import * as style from "./style.module.scss";
import { Form } from "../../../../shared/components/form";
import { Validation, getValidationSchema } from "../../../../shared/utils/validation";

const messageSchema = getValidationSchema<TChatFooterForm>({
  message: Validation.stringRequired(),
});

export class ChatFooter extends Form<TChatFooterBlock, {}, TChatFooterForm> {
  constructor() {
    super({
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

  render() {
    return this.compile(template, { style });
  }
}
