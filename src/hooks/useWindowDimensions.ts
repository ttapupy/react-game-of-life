import { useEffect, useState } from "react";


const getDimensions = (defVal = '') => {
  let width: number;
  let height: number;
  let element: HTMLElement;

  if (defVal?.length) {
    element = document.getElementById(defVal)
  }

  if (element) {
    width = element.offsetWidth
    height = element.offsetHeight
  } else {
    width = window.innerWidth
    height = window.innerHeight
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

      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }, [defVal]);
  
    return dimensions;
  }
