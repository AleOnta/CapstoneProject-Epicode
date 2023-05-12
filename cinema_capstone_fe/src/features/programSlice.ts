import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allprograms: [],
    onGoing: [],
    incoming: []
};

export const programsSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {},
});

export default programsSlice.reducer;