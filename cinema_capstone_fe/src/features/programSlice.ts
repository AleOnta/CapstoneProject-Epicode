import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProgram } from "../interfaces/iProgram";
import axios from "axios";

const programsURL = "http://localhost:8080/api/programs";

interface ProgramState {
  allprograms: IProgram[];
  onGoing: IProgram[];
  incoming: IProgram[];
  status: string;
  error: string | null;
}

const initialState: ProgramState = {
  allprograms: [],
  onGoing: [],
  incoming: [],
  status: "idle",
  error: null,
};

const buildStateObject = (data: IProgram[]) => {
  return {
    allPrograms: data,
    onGoing: data.filter((p) => p.status === "ON_GOING"),
    incoming: data.filter((p) => p.status === "INCOMING"),
  };
};

export const fetchPrograms = createAsyncThunk(
  "programs/fetch",
  async (thunkApi) => {
    try {
      const response = await axios.get(programsURL);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.message;
      }
    }
  }
);

export const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPrograms.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchPrograms.fulfilled, (state, action) => {
      const toStore = buildStateObject(action.payload);
      state.allprograms = toStore.allPrograms;
      state.onGoing = toStore.onGoing;
      state.incoming = toStore.incoming;
      state.status = "fulfilled";
    });

    builder.addCase(fetchPrograms.rejected, (state, action) => {
      state.status = "failed";
      state.error = "define how";
    });
  },
});

export default programsSlice.reducer;
