import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
import { API_BASE } from "../../config";

// Utility to get auth header with token
import { authHeader } from "../../utils/authHeader";

// Fetch order preview
export const fetchOrderPreview = createAsyncThunk(
  "order/preview",
  async (items, { rejectWithValue }) => {
    try {
      // Filter out invalid items (missing productId or quantity)
      const validItems = items
        .filter((i) => i.id && i.quantity)
        .map((i) => ({
          productId: i.id,
          quantity: i.quantity,
        }));

      const res = await axios.post(`${API_BASE}/order/preview`, {
        orderItems: validItems,
      });

      return res.data; // Expected: { success, message, data }
    } catch (e) {
      return rejectWithValue(
        e.response?.data || { message: "Fetch order preview failed" }
      );
    }
  }
);

// Create order
export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const requestData = {
        orderItems: orderData.items,
      };

      console.log("Sending to backend:", requestData);

      const res = await axios.post(`${API_BASE}/order/create`, requestData, {
        headers: authHeader(),
      });
      return res.data; // { success, message, data }
    } catch (e) {
      return rejectWithValue(
        e.response?.data || { message: "Place order failed" }
      );
    }
  }
);

export const deleteOrderById = createAsyncThunk(
  "order/delete",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE}/order/${orderId}`, {
        headers: authHeader(),
      });
      return res.data; // { success, message, data }
    } catch (e) {
      return rejectWithValue(
        e.response?.data || { message: "Delete order failed" }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    preview: null,
    orderResult: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.preview = null;
      state.orderResult = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchOrderPreview.pending, (s) => {
      s.loading = true;
      s.error = null;
      s.successMessage = null;
    })
      .addCase(fetchOrderPreview.fulfilled, (s, a) => {
        s.loading = false;
        s.preview = a.payload.data;
      })
      .addCase(fetchOrderPreview.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.message || "Failed to fetch order preview";
      })
      .addCase(createOrder.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(createOrder.fulfilled, (s, a) => {
        s.loading = false;
        s.orderResult = a.payload.data;
        s.successMessage = a.payload.message;
      })
      .addCase(createOrder.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.message || "Failed to place order";
      })
      .addCase(deleteOrderById.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(deleteOrderById.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload.message;
      })
      .addCase(deleteOrderById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.message || "Failed to delete order";
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
