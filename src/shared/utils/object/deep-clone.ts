import { isObject } from "./is-object";

export const deepClone = <T>(data: T): T => {
  if (!isObject(data)) {
    return data;
  }

  if (data instanceof Array) {
    return data.reduce((arr, item) => {
      arr.push(deepClone(item));
      return arr;
    }, []);
  }

  return Object.keys(data).reduce<TObject>((acc, prop) => {
    acc[prop] = deepClone(data[prop]);
    return acc;
  }, {} as TObject) as T;
};
