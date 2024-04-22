import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trainReducer from './reducers/TrainSlice';
import charReducer from './reducers/CharSlice';

const rootReducer = combineReducers({
  trainReducer,
  charReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];