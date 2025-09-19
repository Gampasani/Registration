import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchCompanies = createAsyncThunk("company/fetchCompanies", async (_, thunkAPI) => {
  try {
    const res = await api.get("/company");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch companies");
  }
});

export const createCompany = createAsyncThunk("company/createCompany", async (data, thunkAPI) => {
  try {
    const res = await api.post("/company", data);
    return res.data.company;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create company");
  }
});

export const updateCompany = createAsyncThunk("company/updateCompany", async (data, thunkAPI) => {
  try {
    const res = await api.put(`/company/${data.id}`, data);
    return res.data.company;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update company");
  }
});

export const deleteCompany = createAsyncThunk("company/deleteCompany", async (id, thunkAPI) => {
  try {
    await api.delete(`/company/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete company");
  }
});

const companySlice = createSlice({
  name: "company",
  initialState: { companies: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchCompanies.fulfilled, (s, a) => { s.loading = false; s.companies = a.payload; })
      .addCase(fetchCompanies.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(createCompany.fulfilled, (s, a) => { s.companies.push(a.payload); })
      .addCase(updateCompany.fulfilled, (s, a) => {
        const i = s.companies.findIndex((c) => c.id === a.payload.id);
        if (i !== -1) s.companies[i] = a.payload;
      })
      .addCase(deleteCompany.fulfilled, (s, a) => { s.companies = s.companies.filter((c) => c.id !== a.payload); });
  }
});
export default companySlice.reducer;
