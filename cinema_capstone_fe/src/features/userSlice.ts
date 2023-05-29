import axios from "axios";
import { IUserSafe } from "../interfaces/iUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const usersURL = "http://localhost:8080/api/users";

interface IUserState {
  logged_in: IUserSafe | null;

  status: string;
  error: string | null;
}

const initialState: IUserState = {
  logged_in: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (username: string, thunkApi) => {
    try {
      const response = await axios.get(`${usersURL}/username/${username}`);
      return await response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.logged_in = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const data = action.payload;
      const user: IUserSafe = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: new Date(data.birthdate).toISOString().slice(0, 10),
        username: data.username,
        email: data.email,
        cinemaPoints: data.cinemaPoints,
        tickets: data.tickets,
      };

      state.logged_in = user;
      state.status = "fulfilled";
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = "define error handling";
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
