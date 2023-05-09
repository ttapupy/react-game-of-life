import { ICell } from '../pages/Board.tsx'
import { useBoardContext } from '../BoardContext.tsx';
import PatternCell from './PatternCell.tsx';


const Pattern = ({ pattern }: { pattern: ICell[][] }) => {

  const { drawSize }: { drawSize: number } = useBoardContext()

  return (
    <div className='pattern'>
      <div className='button-group'>
        <button className='load'>{'Load'}</button>
        <button className='delete'>{'Delete'}</button>
      </div>
      <fieldset disabled={true}>
        <div
          className='board-container'
          style={{ gridTemplateColumns: `repeat(${drawSize}, 1fr)`, gridTemplateRows: `repeat(${drawSize}, 1fr)` }}
        >
          {pattern.map((sor, sorIndex) => sor.map((cell, oszlopIndex) => <PatternCell key={`${sorIndex}_${oszlopIndex}`} cell={cell} />))}

        </div>
      </fieldset>
    </div>
  );
}

export default Pattern;
