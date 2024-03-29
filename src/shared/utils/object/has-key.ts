export const hasKey = <T extends Record<string, unknown>>(
  obj: T,
  key: string | number | symbol
): key is keyof T => key in obj;
