export function getRequest(url) {
  const data = fetch(url);
  return data.then((e) => e.json());
}
