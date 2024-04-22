import axios from "axios";
import { AppDispatch } from "../store";
import { trainSlice } from "./TrainSlice";
import { ITrain } from "../../types/ITrain";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export const fetchTrains = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(trainSlice.actions.trainsFetching());
    const response = await axios.get<ITrain[]>('https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json');
    dispatch(trainSlice.actions.trainsFetchingSuccess(response.data));
  } catch (e) {
    dispatch(trainSlice.actions.trainsFetchingError(getErrorMessage(e)));
  }
}