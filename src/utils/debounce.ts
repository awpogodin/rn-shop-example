export function debounce<T extends Function>(cb: T, ms = 200) {
  let h: ReturnType<typeof setTimeout>;
  let callable = (...args: any) => {
    if (h) {
      clearTimeout(h);
    }
    h = setTimeout(() => cb(...args), ms);
  };
  return <T>(<any>callable);
}
