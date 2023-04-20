import { isObject } from "./is-object";

export const merge = (lhs: TObject, rhs: TObject): TObject => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, rhsValue] of Object.entries(rhs)) {
    const lhsValue = lhs[key];
    if (isObject(lhsValue) && isObject(rhsValue)) {
      // eslint-disable-next-line no-param-reassign
      lhs[key] = merge(lhsValue, rhsValue);
    } else if (lhsValue !== rhsValue) {
      // eslint-disable-next-line no-param-reassign
      lhs[key] = rhsValue;
    }
  }

  return lhs;
};
