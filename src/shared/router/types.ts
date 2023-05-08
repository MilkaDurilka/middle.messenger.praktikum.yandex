import type { TBlockConstructor } from "../utils/block";
import type { Router } from "./router";

export type TRouteProps = {
  rootQuery: string;
  isExact: boolean;
};

export type TImportComponent = () => Promise<{ default: TBlockConstructor }>;

export type TRouterUse = (
  pathname: string,
  component: TImportComponent,
  props?: { isExact: boolean }
) => Router;
