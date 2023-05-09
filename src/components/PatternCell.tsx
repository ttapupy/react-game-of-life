import { CellValue } from '../pages/Board';


const PatternCell = ({ value }: { value: number }) => {

  return (
    <>
      <button
        disabled={true}
        className={`${value === CellValue.ONE ? 'cell-button selected' : 'cell-button'}`}
      />
    </>
  )
}

export default PatternCell;