import { useEffect } from "react";

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const shouldPreventMinimize = target.closest("[data-prevent-minimize]");
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !shouldPreventMinimize
      ) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
