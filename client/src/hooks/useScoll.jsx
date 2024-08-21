import { useState, useEffect } from "react";

export const useOnScroll = (value) => {
  const [isUnder, setIsUnder] = useState(false);

  useEffect(() => {
    const onScroll = (e) => {
      if (e.target.documentElement.scrollTop > value) {
        setIsUnder(true);
      } else {
        setIsUnder(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isUnder;
};
