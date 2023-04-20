import { isObject } from "./is-object";
import { merge } from "./merge";

export const set = (
  obj: TObject | unknown,
  path: string,
  value: unknown
): TObject | unknown => {
  if (!isObject(obj)) {
    return obj;
  }

  const tempObj = path.split(".").reduceRight<TObject>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(obj, tempObj);
};
