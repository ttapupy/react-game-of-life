import { useState, useLayoutEffect, useRef } from "react";
import { useDebounce } from 'use-debounce';

export type DimensionsType = {
  width: number | null;
  height: number | null;
}

export default (fixed = true) => {
  const [disabledDimensions, setDisabledDimensions] = useState(fixed);
  const [dimensions, setDimensions] = useState<DimensionsType>({ width: null, height: null });
  const [debouncedDimensions] = useDebounce(dimensions, 1000);
  const boardRef = useRef<HTMLDivElement | HTMLFieldSetElement>(null)

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { innerWidth, innerHeight } = window
      const largeWidth = innerWidth > 991
      const largeHeight = innerHeight > 772

      let width: number | null;
      let height: number | null;
      if ((boardRef && boardRef.current)) {
        console.log('bejön')
        width = entry.contentRect.width
        height = entry.contentRect.height
        // } else if (dimensions.width && dimensions.height) {
        //   return
      } else {
        return
        // width = innerWidth
        // height = innerHeight
      }

      const calcDimension = (size: number): number => {
        const cellSize = largeWidth && largeHeight ? 16 : 18
        return (Math.floor(size / (2 * cellSize)) * 2)
      }

      !disabledDimensions && setDimensions({ width: calcDimension(width), height: calcDimension(height) });
    });

    observer.observe(boardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [disabledDimensions, boardRef]);

  return { dimensions: debouncedDimensions, setDisabledDimensions, boardRef };
}
