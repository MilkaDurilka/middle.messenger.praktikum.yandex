export const isObject = (val: unknown): val is TObject =>
  val !== null && typeof val === "object" && !Array.isArray(val);
