export const debounce = <T extends unknown[]>(
  mainFunction: (...args: T) => void,
  delay: number,
) => {
  let timer: NodeJS.Timeout;

  return (...args: T) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};
