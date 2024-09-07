import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SmartCell from '../../components/SmartCell';
// import { ICell } from "../../pages/SmartBoard";
// import { BoardAction } from "../../store/BoardSlice";
// import { emptyBoard, hasOneAliveCellBoard } from "../initialBoard";
// import { useBoundStore } from "../../store/useBoundStore";
//
//
// interface UseBoundStoreMock {
//   board: ICell[][] | null;
//   columns: number | null;
//   rows: number | null;
//   dispatchBoard: (args: BoardAction) => void;
//   setDimensions: ({ columns, rows }: { columns: number, rows: number }) => void;
//   initialized: boolean;
//   setInitialized: (initialized: boolean) => void;
//   getCell: (row: number, column: number) => ICell;
// }


describe('renderCell', () => {
  // const spy = jest.spyOn(useBoundStore, 'useBoundStore');

  const renderCell = (rowIndex: number, columnIndex: number) => {
    return render(<SmartCell rowIndex={rowIndex} columnIndex={columnIndex}/>);
  };


  test('should render SmartCell with correct props', () => {
    renderCell(2, 3);
    const cell = screen.getByRole('button');
    expect(cell).toBeInTheDocument()
  });
});