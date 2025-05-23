import { useEffect } from "react";

const useClickFuera = (ref, callback) => {
  useEffect(() => {
    const handleClickFuera = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickFuera);
    return () => {
      document.removeEventListener("mousedown", handleClickFuera);
    };
  }, [ref, callback]);
};

export default useClickFuera;
