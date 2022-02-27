export default function debounce(fn: any, timeout = 300) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, timeout);
  };
}