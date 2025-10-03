import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
import { API_BASE } from "../../config";

// Utility to get auth header with token
import { authHeader } from "../../utils/authHeader";


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
      const res = await axios.post(`${API_BASE}/auth/login`, form);
      return res.data;
    } catch (e) { return rejectWithValue(e.response?.data || { message: "Login failed" }); }
  }
);

// Fetch current user info
export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/user/me`, { headers: authHeader() });
      return res.data; // { success, message, data: {id, username, email, roles} }
    } catch (e) { return rejectWithValue(e.response?.data || { message: "Fetch me failed" }); }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (b) => {
    b.addCase(registerUser.pending, (s)=>{s.loading=true;s.error=null;})
     .addCase(registerUser.fulfilled, (s,a)=>{
        s.loading=false;
        const d=a.payload; 
        s.token=d?.token||null;
        s.user = d ? { username:d.username, email:d.email } : null;
        if(s.token) localStorage.setItem("token", s.token);
     })
     .addCase(registerUser.rejected, (s,a)=>{s.loading=false;s.error=a.payload?.message;})

     .addCase(loginUser.pending, (s)=>{s.loading=true;s.error=null;})
     .addCase(loginUser.fulfilled, (s,a)=>{
        s.loading=false;
        const d=a.payload; 
        s.token=d?.token||null;
        console.log("loginUser.fulfilled", a.payload, d);
        s.user = d ? { username:d.username, email:d.email } : null;
        if(s.token) localStorage.setItem("token", s.token);
     })
     .addCase(loginUser.rejected, (s,a)=>{s.loading=false;s.error=a.payload?.message;})

     .addCase(fetchMe.pending, (s)=>{s.loading=true;s.error=null;})
     .addCase(fetchMe.fulfilled, (s,a)=>{
        s.loading=false;
        const d=a.payload;
        if (d) s.user = d;
     })
     .addCase(fetchMe.rejected, (s,a)=>{s.loading=false;s.error=a.payload?.message;});
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
