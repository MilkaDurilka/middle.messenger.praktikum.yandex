import template from "./template.hbs";
import { Block } from "../../../../shared/utils/block";
import type { TChatFooterBlock } from "./types";
import { Button, Icon } from "../../../../shared/components";
import * as style from "./style.module.scss";

export class ChatFooter extends Block<TChatFooterBlock> {
  constructor() {
    super({
      events: {
        submit: (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());
          console.log("Chat form: ", values);
        },
      },
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
