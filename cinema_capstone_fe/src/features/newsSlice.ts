import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INews } from "../interfaces/iNews";
import axios from "axios";

const newsURL = "http://localhost:8080/api/news";

interface NewsState {
  allNews: INews[];
  status: string;
  error: string | null;
}

const initialState: NewsState = {
  allNews: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetch", async (thunkApi) => {
  try {
    const response = await axios.get(newsURL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }
  }
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.allNews = action.payload;
      state.status = "fulfilled";
    });

    builder.addCase(fetchNews.rejected, (state, action) => {
      state.error = "to define";
      state.status = "failed";
    });
  },
});

export default newsSlice.reducer;
