import { useEffect, useState } from "react";


const getDimensions = (defVal = '') => {
  let width: number;
  let height: number;
  let element: HTMLElement;

  if (defVal?.length) {
    element = document.getElementById(defVal)
  }


  if (element) {
    width = element.offsetWidth * 0.8
    height = element.offsetHeight
  } else {
    width = window.innerWidth * 0.7
    height = window.innerHeight * 0.9
  }
  return { width, height };
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

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [defVal]);

  return dimensions;
}
