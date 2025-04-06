export const debounce = (
  mainFunction: (value: string) => void,
  delay: number,
) => {
  let timer: NodeJS.Timeout;

  return function (value: string) { 
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      mainFunction(value);
    }, delay);
  };
};
