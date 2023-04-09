import { Block } from "../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";
import type { TLinkProps } from "./types";
import { router } from "../../router";

export class Link extends Block<TLinkProps> {
  constructor(props: TLinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const { to, isBack } = this.props;
          if (to) {
            router.go(to);
            return;
          }

          if (isBack) {
            router.back();
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
