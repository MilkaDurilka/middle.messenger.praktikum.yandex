import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { Button, ErrorLayout, Input, InputImg, Link } from "../../shared/components";

export class GuidePage extends Block {
  constructor() {
    super({
      button: new Button({
        text: "button text",
      }),
      link: new Link({ text: "link", href: "#" }),
      input: new Input({ id: "input", name: "name", placeholder: "placeholder", label: "label" }),
      inputWithValue: new Input({
        id: "input",
        name: "name",
        placeholder: "placeholder",
        label: "label",
        value: "value text",
      }),
      inputWithError: new Input({
        id: "input",
        name: "name",
        placeholder: "placeholder",
        label: "label",
        error: "Description error",
      }),
      inputDisabled: new Input({
        id: "input",
        name: "name",
        placeholder: "placeholder",
        label: "label",
        disabled: true,
      }),
      inputImg: new InputImg({ id: "avatar", name: "name" }),
      errorPage: new ErrorLayout({
        title: "404",
        description: "Page not found",
        iconName: "error404",
        linkText: "Back to chat",
        linkUrl: "#",
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
