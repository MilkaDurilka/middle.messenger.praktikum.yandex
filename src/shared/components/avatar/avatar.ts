import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TAvatarProps } from "./types";
import { Block } from "../../utils/block";

export class Avatar extends Block<TAvatarProps> {
  constructor(props: TAvatarProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
