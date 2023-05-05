import { useEffect, useState } from "react";


export default (defVal = '') => {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    function handlePress() {
      setPressed(true)
    }

    function handleRelease() {
      setPressed(false)
    }

    let element = defVal?.length ? document.getElementById(defVal) : window
    element = element || window

    element.addEventListener('mousedown', handlePress);
    element.addEventListener('mouseup', handleRelease);

    return () => {
      element.removeEventListener('mousedown', handlePress);
      element.removeEventListener('mouseup', handleRelease);

    };
  }, [defVal]);

  return pressed;
}