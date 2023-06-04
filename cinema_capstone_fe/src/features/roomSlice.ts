import axios from "axios";
import { IRoom } from "../interfaces/iRoom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const roomsURL = "http://localhost:8080/api/rooms";

interface RoomsState {
  allRooms: IRoom[];
  status: string;
  error: string | null;
}

const initialState: RoomsState = {
  allRooms: [],
  status: "idle",
  error: null,
};

export const fetchRooms = createAsyncThunk("rooms/fetch", async (thunkAPI) => {
  try {
    const response = await axios.get(roomsURL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }
  }
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRooms.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.allRooms = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.status = "failed";
      state.error = "define how";
    });
  },
});

export default roomsSlice.reducer;
