import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProgram } from "../interfaces/iProgram";

interface ProgramState {
  allprograms: IProgram[];
  onGoing: IProgram[];
  incoming: IProgram[];
  status: string;
}

const initialState: ProgramState = {
  allprograms: [],
  onGoing: [],
  incoming: [],
  status: "idle",
};

const buildStateObject = (data: IProgram[]) => {
  const allData = data;
  const onGoingData = data.filter((p) => p.status === "ON_GOING");
  const incomingData = data.filter((p) => p.status === "INCOMING");
  return {
    allPrograms: allData,
    onGoing: onGoingData,
    incoming: incomingData,
  };
};

export const fetchPrograms = createAsyncThunk(
  "programs/fetch",
  async (thunkApi) => {
    try {
      const response = await fetch("http://localhost:8080/api/programs", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPrograms.fulfilled, (state, action) => {
      const toStore = buildStateObject(action.payload);
      state.allprograms = toStore.allPrograms;
      state.onGoing = toStore.onGoing;
      state.incoming = toStore.incoming;
      state.status = "fulfilled";
    });
  },
});

export default programsSlice.reducer;
