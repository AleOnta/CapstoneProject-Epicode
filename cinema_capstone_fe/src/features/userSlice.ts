import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    cinemaPoints: number,
    tickets: []
};

const initialState = {
    user: {}
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
});

export default userSlice.reducer;
