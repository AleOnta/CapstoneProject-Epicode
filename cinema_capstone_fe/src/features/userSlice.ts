import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/iUser";

interface IUserState {
  data: IUser | null;
}

const initialState: IUserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
