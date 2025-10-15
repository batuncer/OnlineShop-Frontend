import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
import { API_BASE } from "../../config";

// Fetch products list with pagination
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts", 
    async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_BASE}/products`);
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

// Update product by ID
export const updateProductById = createAsyncThunk(
    "product/updateProductById",
    async ({ productId, productData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(`${API_BASE}/products/${productId}`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data; // { success, message, data: { ... } }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Update product failed" });
        }
    }
)

// Add new product
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(`${API_BASE}/products`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return res.data; // { success, message, data: { ... } }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Add product failed" });
        }
    }
)

// Delete product by ID
export const deleteProductById = createAsyncThunk(
    "product/deleteProductById",
    async (productId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.delete(`${API_BASE}/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return { productId, data: res.data }; // Return productId for state update
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Delete product failed" });
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
        updateLoading: false, // Separate loading for updates
        deleteLoading: false, // Separate loading for deletes
        error: null,
        successMessage: "", // Add success message to state
    },
    reducers: {
        clearProduct: (state) => {
            state.product = null;
            state.error = null;
            state.loading = false;
        },
        setCurrentPage: (state, action) => {
            state.pageInfo.page = action.payload;
        },
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = "";
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
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
        })
        // Update product
        .addCase(updateProductById.pending, (state) => {
            state.updateLoading = true;
            state.error = null;
        })
        .addCase(updateProductById.fulfilled, (state, action) => {
            state.updateLoading = false;
            state.successMessage = "Product updated successfully!";
            
            // Update the product in the products array
            const updatedProduct = action.payload.data;
            if (Array.isArray(state.products)) {
                const index = state.products.findIndex(p => p.id === updatedProduct.id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            }
        })
        .addCase(updateProductById.rejected, (state, action) => {
            state.updateLoading = false;
            state.error = action.payload?.message || "Failed to update product";
        })
        // Add product
        .addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = "Product added successfully!";
            
            // Add new product to the products array
            if (Array.isArray(state.products)) {
                state.products.push(action.payload.data);
            }
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add product";
        })
        // Delete product
        .addCase(deleteProductById.pending, (state) => {
            state.deleteLoading = true;
            state.error = null;
        })
        .addCase(deleteProductById.fulfilled, (state, action) => {
            state.deleteLoading = false;
            state.successMessage = "Product deleted successfully!";
            
            // Remove product from products array
            const deletedProductId = action.payload.productId;
            if (Array.isArray(state.products)) {
                state.products = state.products.filter(p => p.id !== deletedProductId);
            }
        })
        .addCase(deleteProductById.rejected, (state, action) => {
            state.deleteLoading = false;
            state.error = action.payload?.message || "Failed to delete product";
        });
    }
});

export const { clearProduct, setCurrentPage, clearMessages, setSuccessMessage } = productSlice.actions;
export default productSlice.reducer;