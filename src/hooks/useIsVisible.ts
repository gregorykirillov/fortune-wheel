import { useState, useEffect } from "react";

export const useIsVisible = (
  ref: React.MutableRefObject<HTMLElement | null>
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    if (ref?.current) observer.observe(ref?.current);

    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
};
