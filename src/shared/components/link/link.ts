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
          const { to } = this.props;
          if (to) {
            router.go(to);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
