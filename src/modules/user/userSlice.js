import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
import { API_BASE } from "../../config";

// Utility to get auth header with token
import { authHeader } from "../../utils/authHeader"


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

export const getUserOrders = createAsyncThunk(
  "user/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const headers = authHeader(true);
      const res = await axios.get(`${API_BASE}/order/orders`, { headers });
      return res.data; // { success, message, data: [...] }
    } catch (e) { return rejectWithValue(e.response?.data || { message: "Fetch orders failed" }); }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const headers = authHeader(true);
      const res = await axios.get(`${API_BASE}/user`, { headers });
      return res.data; // { success, message, data: [...] }
    } catch (e) {
      return rejectWithValue(e.response?.data || { message: "Fetch users failed" });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    token: null,
    loading: false,
    ordersLoading: false,
    error: null,
    orderList: [],
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchMe.fulfilled, (s, action) => {
        s.loading = false;
        s.user = action.payload.data;
      })
      .addCase(fetchMe.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload.message;
      })
      .addCase(getUserOrders.pending, (s) => { s.ordersLoading = true; s.error = null; })
      .addCase(getUserOrders.fulfilled, (s, action) => {
        s.ordersLoading = false;
        s.orderList = action.payload.data;
        console.log("Fetched orders:", action.payload.data);
      })
      .addCase(getUserOrders.rejected, (s, action) => {
        s.ordersLoading = false;
        s.error = action.payload.message;
      })
      .addCase(fetchUsers.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchUsers.fulfilled, (s, action) => {
        s.loading = false;
        s.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload.message;
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
