import { useEffect, useState } from "react";

export type DimensionsType = {
  width: number | null;
  height: number | null;
}

const getDimensions = (defVal = '') => {
  let width: number | null;
  let height: number | null;
  let element: HTMLElement;

  if (defVal?.length) {
    element = document.getElementById(defVal)
  }

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const largeWidth = windowWidth > 991
  const largeHeight = windowHeight > 772
  const portrait = windowHeight > windowWidth
  const heightMultiplier = portrait && !largeHeight ? 0.8 : 1
  const widthMultiplier = portrait && !largeWidth ? 0.9 : 0.7

  if (element) {
    width = element.offsetWidth
    height = heightMultiplier * element.offsetHeight
  } else {
    width = windowWidth * widthMultiplier
    height = windowHeight * heightMultiplier
  }

  const cellSize = largeWidth && largeHeight ? 16 : 18

  const calcDimension = (size: number): number => (Math.floor(size / (2 * cellSize)) * 2)

  return { width: calcDimension(width), height: calcDimension(height) };
}

export default (defVal = '', active = true) => {
  const [dimensions, setDimensions] = useState<DimensionsType>({ width: null, height: null });
  const [disabledDimensions, setDisabledDimensions] = useState(!active)

  useEffect(() => {
    function resize() {
      !disabledDimensions && setDimensions(getDimensions(defVal));
    }

    resize();
    screen.orientation.addEventListener("change", resize);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      screen.orientation.removeEventListener("change", resize)
    }
  }, [defVal, disabledDimensions]);

  return { dimensions, setDisabledDimensions };
}
