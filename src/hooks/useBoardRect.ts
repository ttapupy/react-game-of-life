import { useState, useLayoutEffect, useRef } from "react";
import { useDebounce } from 'use-debounce';
import scssVariables from '../styles/cellsize.module.scss';

export type DimensionsType = {
  width: number | null;
  height: number | null;
}

export default (fixed = true) => {
  const [disabledDimensions, setDisabledDimensions] = useState(fixed);
  const [dimensions, setDimensions] = useState<DimensionsType>({width: null, height: null});
  const [debouncedDimensions] = useDebounce(dimensions, 1000);
  const boardRef = useRef<HTMLDivElement | HTMLFieldSetElement>(null)
  const {smallCell, bigCell} = scssVariables;
  const widthThreshold = 991;
  const heightThreshold = 772;

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const {innerWidth, innerHeight} = window
      const largeWidth = innerWidth > widthThreshold
      const largeHeight = innerHeight > heightThreshold

      let width: number | null;
      let height: number | null;
      if ((boardRef && boardRef.current)) {
        width = entry.contentRect.width
        height = entry.contentRect.height
      } else {
        return
      }

      const calcDimension = (size: number): number => {
        const cellSize = largeWidth && largeHeight ? parseInt(smallCell) : parseInt(bigCell)
        return (Math.floor(size / (2 * cellSize)) * 2)
      }

      if (!disabledDimensions) {
        setDimensions(() => ({width: calcDimension(width), height: calcDimension(height)}));
      }
    });
    if (boardRef?.current) {
      observer.observe(boardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [disabledDimensions, boardRef, smallCell, bigCell]);

  return {dimensions: debouncedDimensions, setDisabledDimensions, boardRef};
}
