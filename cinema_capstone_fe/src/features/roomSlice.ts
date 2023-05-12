import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allRooms: []
};

export const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
});

export default roomsSlice.reducer;