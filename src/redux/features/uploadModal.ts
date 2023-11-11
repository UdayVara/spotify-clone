import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface uploadModalState {
  isOpen: boolean,
}

const initialState: uploadModalState = {
    isOpen:false,
}

export const uploadModalSlice = createSlice({
  name: 'uploadModal',
  initialState,
  reducers: {
    open: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { open,close } = uploadModalSlice.actions

export default uploadModalSlice.reducer