import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type song = {
  name:string,
  image:string,
  song:string,
  singer:string
}

export interface playerState {
  currentSong: song;
  queue: song[];
  hasPlayed:boolean
}
const initialState: playerState = {
  currentSong: {name:"",image:"",song:"",singer:""},
  queue: [],
  hasPlayed:false
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<song>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      (state.currentSong = action.payload)
      state.hasPlayed = true
    },
    addSong: (state, action: PayloadAction<song>) => {
        const arr = state.queue
        arr.push(action.payload)
        
      state.queue = arr;
      state.hasPlayed = true
    },
  },
});

// Action creators are generated for each case reducer function
export const { play, addSong } = playerSlice.actions;

export default playerSlice.reducer;
