import PatternSide from '../components/PatternsSide';
import { useBoardContext } from '../BoardContext.tsx';
import { ICell } from '../pages/Board.tsx'
import Pattern from '../components/Pattern';



export default function Patterns() {
  const { savedPatterns }: { savedPatterns: ICell[][][] } = useBoardContext()


  return (
    <>
      <div className='sidebar-wrapper'>
        <PatternSide />
      </div>
      <div className='patterns-wrapper'>

        {savedPatterns.map((pattern, index) => <Pattern key={index} pattern={pattern} />)}

      </div>
    </>
  );
}