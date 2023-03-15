export function queryStringify(data: Record<string, unknown>): string {
  const query: string[] = [];

  Object.entries(data).forEach(([key, value]) => {
    query.push(`${encodeURI(key)}=${value}`);
  });

  return `?${query.join("&")}`;
}
