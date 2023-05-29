import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../features/movieSlice";
import roomSlice from "../features/roomSlice";
import programSlice from "../features/programSlice";
import newsSlice from "../features/newsSlice";
import userSlice from "../features/userSlice";
import ticketSlice from "../features/ticketSlice";
import checkoutSlice from "../features/checkoutSlice";
import preferenceSlice from "../features/preferenceSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    rooms: roomSlice,
    programs: programSlice,
    news: newsSlice,
    user: userSlice,
    preferences: preferenceSlice,
    checkout: checkoutSlice,
    tickets: ticketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
