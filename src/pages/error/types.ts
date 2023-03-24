import type { TErrorCodes } from "./utils/errors-data";
import type { Block } from "../../shared/utils/block";

export type TErrorProps = {
  errorCode: TErrorCodes;
};

export type TErrorBlock = {
  errorPage: Block;
};
