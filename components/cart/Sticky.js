import { useState, useEffect, useRef, useCallback } from "react";

const Sticky = ({ defaultSticky = false, isTop = true }) => {
  const [isSticky, setIsSticky] = useState(defaultSticky);
  const elementRef = useRef(null);

  const toggleSticky = useCallback(
    ({ top, bottom }) => {
      if (!isTop && top) {
        if (window.pageYOffset < top) {
          !isSticky && setIsSticky(true);
        } else {
          isSticky && setIsSticky(false);
        }
      } else {
        if (window.pageYOffset > bottom) {
          !isSticky && setIsSticky(true);
        } else {
          isSticky && setIsSticky(false);
        }
      }
    },
    [isSticky, isTop]
  );

  const handleScroll = useCallback(() => {
    toggleSticky(elementRef?.current?.getBoundingClientRect());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleSticky, handleScroll]);

  return { elementRef, isSticky, handleScroll };
};

export default Sticky;
