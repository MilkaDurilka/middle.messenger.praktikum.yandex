import type { Block } from "../utils/block";
import type { TRouteProps, TImportComponent } from "./types";
import { renderDOM } from "../utils/renderDOM";

export class Route {
  private component: Block | null = null;

  private regExp: RegExp;

  constructor(
    public pathname: string,
    private readonly importComponentClass: TImportComponent,
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

  async render(): Promise<void> {
    if (!this.component) {
      // dynamic load pages script
      const { default: Cmp } = await this.importComponentClass();
      this.component = new Cmp();
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
