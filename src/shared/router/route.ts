import type { Block, TBlockConstructor } from "../utils/block";
import type { TRouteProps } from "./types";
import { renderDOM } from "../utils/renderDOM";

export class Route {
  private component: Block | null = null;

  private regExp: RegExp;

  constructor(
    public pathname: string,
    private readonly ComponentClass: TBlockConstructor,
    private props: TRouteProps
  ) {
    this.regExp = new RegExp(this.pathname);
  }

  match(pathname: string) {
    if (this.props.isExact) {
      return this.pathname === pathname;
    }
    return this.regExp.test(pathname);
  }

  render(): void {
    if (!this.component) {
      this.component = new this.ComponentClass();
      renderDOM(this.props.rootQuery, this.component);
      return;
    }

    this.component.render();
  }

  leave(): void {
    if (this.component) {
      this.component.dispatchDestroy();
      this.component = null;
    }
  }
}
