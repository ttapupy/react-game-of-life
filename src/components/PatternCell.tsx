import { ICell } from '../pages/Board';
import { CellValue } from '../pages/Board';


const PatternCell = ({ cell }: { cell: ICell }) => {

  return (
    <>
      <button
        disabled={true}
        className={`${cell?.value === CellValue.ONE ? 'cell-button selected' : 'cell-button'}`}
      />
    </>
  )
}

export default PatternCell;