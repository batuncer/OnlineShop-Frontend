import { configureStore } from "@reduxjs/toolkit";

// Auth Slice
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});
