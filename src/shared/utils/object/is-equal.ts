import { isObject } from "./is-object";

const isObjectOrArray = (item: unknown): item is TObject | [] =>
  isObject(item) || Array.isArray(item);

export const isEqual = (lhs: TObject, rhs: TObject): boolean => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, lhsValue] of Object.entries(lhs)) {
    const rhsValue = rhs[key];
    if (isObjectOrArray(lhsValue) && isObjectOrArray(rhsValue)) {
      if (isEqual(rhsValue, lhsValue)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      return false;
    }

    if (lhsValue !== rhsValue) {
      return false;
    }
  }

  return true;
};
