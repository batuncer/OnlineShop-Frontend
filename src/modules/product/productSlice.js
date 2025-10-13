import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
import { API_BASE } from "../../config";

// Fetch products list with pagination
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts", 
    async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_BASE}/products?page=${page}&size=${size}`);
            return res.data; // { success, message, data: [ {...}, {...} ] }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Fetch products failed" });
        }
     }
)

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
    "product/fetchProductById",
    async (productId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_BASE}/products/${productId}`);
            return res.data; // { success, message, data: { ... } }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Fetch product failed" });
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product: null,
        pageInfo: {
            page: 0,
            totalPages: 0,
            totalResults: 0,
            size: 10
        },
        loading: false,
        error: null,
    },
    reducers: {
        clearProduct: (state) => {
            state.product = null;
            state.error = null;
            state.loading = false;
        },
        setCurrentPage: (state, action) => {
            state.pageInfo.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        // Fetch products
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
            // Update pageInfo with response data
            if (action.payload.pageInfo) {
                state.pageInfo = {
                    ...state.pageInfo,
                    ...action.payload.pageInfo
                };
            }
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to fetch products";
        }) 
        // Fetch product by ID
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;   
            state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.data;
            console.log("Fetched product:", state.product);
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to fetch product";
        });
    }
});

export const { clearProduct, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;