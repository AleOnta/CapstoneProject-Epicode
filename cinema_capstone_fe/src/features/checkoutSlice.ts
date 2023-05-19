import { createSlice } from "@reduxjs/toolkit";
import { SerializableDateAndTime } from "../interfaces/CommonInterfaces";
import { IProgram } from "../interfaces/iProgram";

interface CheckOutState {
  pickedDateAndTime: SerializableDateAndTime;
  pickedSeats: string[];
  pickedProgram: IProgram | null;
}

const initialState: CheckOutState = {
  pickedDateAndTime: { date: "", time: "" },
  pickedSeats: [],
  pickedProgram: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setPickedDate: (state, action) => {
      state.pickedDateAndTime = {
        ...state.pickedDateAndTime,
        date: action.payload,
      };
    },
    setPickedTime: (state, action) => {
      state.pickedDateAndTime = {
        ...state.pickedDateAndTime,
        time: action.payload,
      };
    },
    setPickedProgram: (state, action) => {
      state.pickedProgram = action.payload;
    },
    addPickedSeats: (state, action) => {
      state.pickedSeats = [...state.pickedSeats, action.payload];
    },
    removePickedSeats: (state, action) => {
      state.pickedSeats = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {
  setPickedDate,
  setPickedTime,
  setPickedProgram,
  addPickedSeats,
  removePickedSeats,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
