export function queryStringify(data: TObject): string {
  const query: string[] = [];

  Object.entries(data).forEach(([key, value]) => {
    query.push(`${encodeURI(key)}=${value}`);
  });

  return `?${query.join("&")}`;
}
