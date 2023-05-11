import { Route } from "./route";
import type { TRouterUse } from "./types";

export class Router {
  private static instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history: History = window.history;

  private readonly rootQuery: string;

  constructor(rootQuery: string) {
    this.rootQuery = rootQuery;

    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    Router.instance = this;
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  use: TRouterUse = (pathname, component, props = { isExact: true }) => {
    const route = new Route(pathname, component, {
      rootQuery: this.rootQuery,
      isExact: props.isExact,
    });

    this.routes.push(route);

    return this;
  };

  start() {
    window.addEventListener("popstate", (event) => {
      const currentTarget = event.currentTarget as typeof window;
      this.onRoute(currentTarget.location.pathname);
    });

    this.onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  reset() {
    this.routes = [];
    this.currentRoute = null;
  }
}

export const router = new Router("#root");
