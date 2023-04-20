export const isObject = (val: unknown): val is TObject =>
  val !== null &&
  typeof val === "object" &&
  Object.prototype.toString.call(val) === "[object Object]";
