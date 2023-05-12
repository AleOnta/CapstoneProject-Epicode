import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allNews: []
};

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {}
});

export default newsSlice.reducer;