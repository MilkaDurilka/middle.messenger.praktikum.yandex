import type { IBlockConstructor } from "../utils/block";
import type { Router } from "./router";

export type TRouteProps = {
  rootQuery: string;
  isExact: boolean;
};

export type TRouterUse = (pathname: string, component: IBlockConstructor, props?: { isExact: boolean }) => Router;
