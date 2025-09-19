import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: { profile: null },
  reducers: {
    setCompanyProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setCompanyProfile } = companySlice.actions;
export default companySlice.reducer;
