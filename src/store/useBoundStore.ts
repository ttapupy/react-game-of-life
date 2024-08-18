import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware';
import { createBoardSlice } from './BoardSlice'
import type { BoardSliceType } from './BoardSlice'
import {createGameSlice} from "./GameSlice";
import type {GameSliceType} from "./GameSlice";



export const useBoundStore = create<BoardSliceType & GameSliceType>()(subscribeWithSelector((set, get, store) => {

    return ({
      ...createBoardSlice(set, get, store),
      ...createGameSlice(set, get, store),
    })
  }
))