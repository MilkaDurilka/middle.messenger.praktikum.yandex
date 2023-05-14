import argv from "webpack-nano/argv";

const mode: string = (argv.mode as string) || "production";

const isProduction = mode === "production";
export const ifProduction = <T>(content: T): T | null =>
  isProduction ? content : null;
export const ifNotProduction = <T>(content: T): T | null =>
  !isProduction ? content : null;

export const removeEmpty = <T extends Array<any>>(
  arr: T
): Exclude<T[number], null>[] => arr.filter((item) => !!item);
