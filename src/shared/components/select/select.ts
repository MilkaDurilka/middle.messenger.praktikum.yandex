import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TSelectProps, TSelectBlockProps } from "./types";
import { Icon } from "../icon";
import { PlainSelect } from "./ui";

export class Select extends Block<TSelectBlockProps> {
  constructor(props: TSelectProps) {
    const { id, disabled, label, options, ...restProps } = props;
    super({
      id,
      disabled,
      label,
      select: new PlainSelect({
        id,
        options,
        ...restProps,
      }),
      iconError: new Icon({ name: "error", width: 16 }),
    });
  }

  updated(oldProps: TSelectBlockProps, newProps: TSelectBlockProps): boolean {
    const result = super.updated(oldProps, newProps);
    if (result) {
      this.getChildren("select")?.setProps({
        ...newProps,
      });
    }
    return result;
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
