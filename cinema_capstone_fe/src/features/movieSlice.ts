import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../interfaces/iMovies";
import axios from "axios";

const moviesURL = "http://localhost:8080/api/movies";

interface MoviesState {
  allMovies: IMovie[];
  inRoom: IMovie[];
  incoming: IMovie[];
  status: string;
  error: string | null;
}

const initialState: MoviesState = {
  allMovies: [],
  inRoom: [],
  incoming: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetch",
  async (thunkAPI) => {
    try {
      const response = await axios.get(moviesURL);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.message;
      }
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setInRoomMovies: (state, action) => {
      state.inRoom = action.payload;
    },

    setIncomingMovies: (state, action) => {
      state.incoming = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.status = "failed";
      state.error = "define how";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.allMovies = action.payload;
      state.status = "fulfilled";
    });
  },
});

export const { setIncomingMovies, setInRoomMovies } = movieSlice.actions;
export default movieSlice.reducer;
