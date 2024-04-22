import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICharacteristics, ITrain } from "../../types/ITrain";

export interface TrainState {
  trains: ITrain[],
  isLoading: boolean,
  error: string,
  currentTrain: number 
}

const initialState: TrainState = {
  trains: [],
  isLoading: false,
  error: '',
  currentTrain: 0
}

export const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    trainsFetching(state) {
      state.isLoading = true;
    },
    trainsFetchingSuccess(state, action: PayloadAction<ITrain[]>) {
      state.isLoading = false;
      state.error = '';
      state.trains = action.payload;
    },
    trainsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    trainsUpdateData(state, action: PayloadAction<ICharacteristics[]>) {
      state.trains[state.currentTrain].characteristics = action.payload;
    },
    currentTrainUpdate(state, action: PayloadAction<number>) {
      state.currentTrain = action.payload;
    } 
  },
})

export default trainSlice.reducer;