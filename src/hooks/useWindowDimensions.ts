import { useEffect, useState } from "react";


const getWindowDimensions = (defVal = '') => {

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
    width = window.innerWidth * 0.6
    height = window.innerHeight * 0.8
  }
    return {
      width,
      height
    };
  }
  
  export default (defVal = '') => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions(defVal)
    );
  
    useEffect(() => {
      setWindowDimensions(getWindowDimensions(defVal));
    }, [defVal]);
  
    return windowDimensions;
  }
