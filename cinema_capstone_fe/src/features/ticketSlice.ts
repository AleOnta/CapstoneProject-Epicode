import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTickets: []
};

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {}
});

export default ticketsSlice.reducer;