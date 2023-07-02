import { useRef, useState } from "react";
import { useResizeObserver } from "@mediamonks/react-hooks";

export function useElementWidth() {
  const [width, setWidth] = useState<number>();
  const elementRef = useRef<HTMLDivElement>(null); // todo: why cant i use HTMLElement here

  useResizeObserver(elementRef, () => {
    if (elementRef.current) {
      setWidth(elementRef.current.offsetWidth);
    }
  });

  return { elementRef, width };
}
