import { Block } from "../../shared/utils/block";
import template from "./template.hbs";
import { ROUTES } from "../../shared/router/constants";
import type { TLayoutProps, TLayoutBlock } from "./types";
import { Nav } from "../../shared/components";

export class Layout extends Block<TLayoutBlock> {
  constructor(props: TLayoutProps) {
    const navs = Object.entries(ROUTES).map(([name, path]) => ({ name, path }));
    super({ ...props, navs: new Nav({ navs }) });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
