import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
import { API_BASE } from "../../config";

// Utility to get auth header with token
import { authHeader } from "../../utils/authHeader";

// Fetch all suppliers
export const fetchSuppliers = createAsyncThunk(
  "supplier/fetchSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/suppliers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSupplier = createAsyncThunk(
  "supplier/addSupplier",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/suppliers`, supplierData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.suppliers.push(action.payload);
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supplierSlice.reducer;
