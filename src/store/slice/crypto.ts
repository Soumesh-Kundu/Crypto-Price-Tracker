import { createSlice } from "@reduxjs/toolkit";
import { cryptoData } from "../../lib/types";
type stateType = {
  cryptoList: cryptoData[];
  isLoading: boolean;
  error: boolean;
};
const intitalState: stateType = {
  cryptoList: [],
  isLoading: false,
  error: false,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: intitalState,
  reducers: {
    setData(state, action:{payload: cryptoData[]}) {
      state.cryptoList = action.payload;
    },
    setError(state, action:{payload: boolean}) {
      state.error = action.payload;
    },
    setLoading(state, action:{payload: boolean}) {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setError, setLoading } = cryptoSlice.actions;
export const cryptoReducer = cryptoSlice.reducer;
