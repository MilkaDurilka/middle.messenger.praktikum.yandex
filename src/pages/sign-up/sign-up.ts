import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import type { TLoginBlockProps } from "./types";
import { SignUpForm } from "./ui";

export class SignUpPage extends Block<TLoginBlockProps> {
  constructor() {
    super({
      title: "Sign up",
      form: new SignUpForm(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
