import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
import { API_BASE } from "../../config";

// Utility to get auth header with token
import { authHeader } from "../../utils/authHeader"

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (form, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, form);
      return res.data; // { success, message, data:{token, username, email} }
    } catch (e) { return rejectWithValue(e.response?.data || { message: "Register failed" }); }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (form, { rejectWithValue }) => {
    try {
      const headers = authHeader(true);
      const res = await axios.post(`${API_BASE}/auth/login`, form, { headers });
      return res.data;
    } catch (e) { return rejectWithValue(e.response?.data || { message: "Login failed" }); }
  }
);

// Fetch current user info
export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const headers = authHeader(true);
      const res = await axios.get(`${API_BASE}/user/me`, { headers });
      console.log(res.data);
      return res.data; // { success, message, data: {id, username, email, roles} }
    } catch (e) { return rejectWithValue(e.response?.data || { message: "Fetch me failed" }); }
  }
);

// Helper function to clear persist storage
const clearPersistStorage = () => {
  try {
    localStorage.removeItem('persist:root');
  } catch (error) {
    console.error('Error clearing persist storage:', error);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; 
      state.token = null;
      clearPersistStorage();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(registerUser.pending, (s)=>{s.loading=true;s.error=null;})
     .addCase(registerUser.fulfilled, (s,a)=>{
        s.loading=false;
        const d=a.payload?.data; 
        s.token=d?.token||null;
        s.user = d ? { username:d.username, email:d.email, id:d.userId, role: d.role } : null;
     })
     .addCase(registerUser.rejected, (s,a)=>{
        s.loading=false;
        s.error=a.payload?.data?.message||"Register failed";
        s.user = null;
        s.token = null;
        clearPersistStorage();
     })

     .addCase(loginUser.pending, (s)=>{s.loading=true;s.error=null;})
     .addCase(loginUser.fulfilled, (s,a)=>{
        s.loading=false;
        const d=a.payload?.data
        s.token=d?.token||null;
        console.log("Login successful, token:", s.token);
        s.user = d ? { username:d.username, email:d.email, id:d.userId, role: d.role } : null;
     })
     .addCase(loginUser.rejected, (s,a)=>{
        s.loading=false;
        s.error=a.payload?.data?.message||"Login failed";
        s.user = null;
        s.token = null;
        clearPersistStorage();
     })

     .addCase(fetchMe.pending, (s)=>{s.loading=true;s.error=null;})
     .addCase(fetchMe.fulfilled, (s,a)=>{
        s.loading=false;
        const d=a.payload;
        console.log("fetchMe successful, user data:", d);
        if (d) s.user = { username:d.data.username, email:d.data.email, id:d.data.id, role: d.data.role };
     })
     .addCase(fetchMe.rejected, (s,a)=>{
        s.loading=false;
        s.error=a.payload?.message;
        s.user = null;
        s.token = null;
        clearPersistStorage();
     });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
