import { useEffect, useState } from "react";


const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  export default () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      setWindowDimensions(getWindowDimensions());
    }, []);
  
    return windowDimensions;
  }
