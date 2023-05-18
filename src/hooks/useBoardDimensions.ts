import { useEffect, useState } from "react";


const getDimensions = (defVal = '') => {
  let width: number;
  let height: number;
  let element: HTMLElement;

  if (defVal?.length) {
    element = document.getElementById(defVal)
  }

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight


  if (element) {
    width = Math.min(element.offsetWidth, windowWidth * 0.7)
    height = Math.min(element.offsetHeight, windowHeight * 0.9)
  } else {
    width = windowWidth * 0.7
    height = windowHeight * 0.9
  }

  const cellSize = windowWidth > 991 ? 16 : 18

  const calcDimension = (size: number): number => (Math.floor(size / (2 * cellSize)) * 2)

  return { width: calcDimension(width), height: calcDimension(height) };
}

export default (defVal = '') => {
  const [dimensions, setDimensions] = useState(
    getDimensions(defVal)
  );

  useEffect(() => {
    const resize = () => {

      setDimensions(getDimensions(defVal));
    }

    resize()

    screen.orientation.addEventListener("change", resize)

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [defVal]);

  return dimensions;
}
