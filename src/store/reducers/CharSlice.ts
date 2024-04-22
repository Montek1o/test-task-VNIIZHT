import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ICharacteristics } from "../../types/ITrain";

export interface CharacteristicsState {
  chars: ICharacteristics[],
  validation: boolean,
  currentChar: number | null
}

const initialState: CharacteristicsState = {
  chars: [],
  validation: true,
  currentChar: null
}

export const characteristicsSlice = createSlice({
  name: 'characteristics',
  initialState,
  reducers: {
    charValid(state) {
      state.validation = true;
    },
    charNoValid(state) {
      state.validation = false;
    },
    currentCharUpdate(state, action) {
      state.currentChar = action.payload;
    },
    getChars(state, action: PayloadAction<ICharacteristics[]>) {
      state.chars = action.payload;
    },
    charUpdate(state, action: PayloadAction<ICharacteristics>) {
      state.chars[state.currentChar as number] = action.payload;
    }
  }
})

export default characteristicsSlice.reducer;