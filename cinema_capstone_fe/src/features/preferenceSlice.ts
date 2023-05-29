import { createSlice } from "@reduxjs/toolkit";

export interface PreferenceState {
  remember: boolean;
  showCP: boolean;
  bg: string;
  commercialConsense: boolean;
  newsletterConsense: boolean;
}

const initialState: PreferenceState = {
  remember: false,
  showCP: false,
  bg: "#000000",
  commercialConsense: false,
  newsletterConsense: false,
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
    setCommercialConsense: (state, action) => {
      state.commercialConsense = action.payload;
    },
    setNewsletterConsense: (state, action) => {
      state.newsletterConsense = action.payload;
    },
    rehydratePreferences: (state, action) => {
      state = action.payload;
    },
  },
});

export const {
  setRemember,
  setShowCP,
  setBg,
  setCommercialConsense,
  setNewsletterConsense,
  rehydratePreferences,
} = preferenceSlice.actions;
export default preferenceSlice.reducer;
