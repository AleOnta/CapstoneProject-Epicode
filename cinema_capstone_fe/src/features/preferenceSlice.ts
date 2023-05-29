import { createSlice } from "@reduxjs/toolkit";

export interface PreferenceState {
  remember: boolean;
  showCP: boolean;
  bg: string;
}

const initialState: PreferenceState = {
  remember: false,
  showCP: false,
  bg: "#000000",
};

const preferenceSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    setShowCP: (state, action) => {
      state.showCP = action.payload;
    },
    setBg: (state, action) => {
      state.bg = action.payload;
    },
    rehydratePreferences: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setRemember, setShowCP, setBg, rehydratePreferences } =
  preferenceSlice.actions;
export default preferenceSlice.reducer;
