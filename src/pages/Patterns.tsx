import PatternSide from '../components/PatternsSide';
import { useBoardContext } from '../BoardContext.tsx';
import Pattern from '../components/Pattern';
import { useEffect } from 'react';



export default function Patterns() {
  const { savedPatterns, setStarted }: { savedPatterns: number[][][], setStarted: React.Dispatch<React.SetStateAction<boolean>> } = useBoardContext()

  useEffect(() => {
    setStarted(false)
  }, [setStarted])

  return (
    <>
      <div className='sidebar-wrapper'>
        <PatternSide />
      </div>
      <div className='patterns-wrapper'>

        {savedPatterns.map((pattern, index) => <Pattern key={index} pattern={pattern} index={index} />)}

      </div>
    </>
  );
}