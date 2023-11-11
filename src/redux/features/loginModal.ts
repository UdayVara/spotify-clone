import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface loginModalState {
  isOpen: boolean,
  option:string
}

const initialState: loginModalState = {
    isOpen:false,
    option:""
}

export const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    open: (state,action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isOpen = true,
      state.option = action.payload
    },
    close: (state) => {
      state.isOpen = false
      state.option = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { open,close } = loginModalSlice.actions

export default loginModalSlice.reducer