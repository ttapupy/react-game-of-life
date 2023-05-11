import { createContext, useContext } from 'react'

export const BoardContext = createContext(null)

export const useBoardContext = () => {
  return useContext(BoardContext);
}