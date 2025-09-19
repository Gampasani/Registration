import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import companyReducer from "./store/companySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
});

export default store;
