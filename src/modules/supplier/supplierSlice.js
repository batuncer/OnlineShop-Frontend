import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../../config";
import { authHeader } from "../../utils/authHeader";

// Fetch suppliers
export const fetchSuppliers = createAsyncThunk(
  "supplier/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const headers = authHeader(true);
      const res = await axios.get(`${API_BASE}/suppliers`, { headers });
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data || { message: "Fetch suppliers failed" }
      );
    }
  }
);

// Add supplier
export const addSupplier = createAsyncThunk(
  "supplier/add",
  async (supplierData, { rejectWithValue }) => {
    try {
      const headers = authHeader(true);
      const res = await axios.post(
        `${API_BASE}/suppliers/create`,
        supplierData,
        { headers }
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data || { message: "Add supplier failed" }
      );
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    suppliers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSuppliers: (state, action) => {
      state.suppliers = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearSuppliers: (state) => {
      state.suppliers = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (!Array.isArray(state.suppliers)) {
          state.suppliers = [];
        }
        if (action.payload.data) {
          state.suppliers.push(action.payload.data);
        } else if (action.payload) {
          state.suppliers.push(action.payload);
        }
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Add supplier failed";
      });
  },
});

export default supplierSlice.reducer;
