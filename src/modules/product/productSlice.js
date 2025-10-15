import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../../config";
import { authHeader } from "../../utils/authHeader";

// Fetch products list with pagination
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts", 
    async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
        try {
            // Add pagination parameters to the URL
            const res = await axios.get(`${API_BASE}/products?page=${page}&size=${size}`);
            return res.data; // { success, message, data: { content: [...], totalPages, etc. } }
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
            const headers = authHeader(true);
            const res = await axios.put(`${API_BASE}/products/${productId}`, productData, { headers });
            return res.data; // { success, message, data: { ... } }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Update product failed" });
        }
    }
)

// Add product
export const addProduct = createAsyncThunk(
  "product/add",
  async (productData, { rejectWithValue }) => {
    try {
      const headers = authHeader(true);
      const res = await axios.post(`${API_BASE}/products`, productData, { headers });
      console.log("Product add response:", res.data);
      return res.data;
    } catch (e) {
      console.error("Product add error:", e.response?.data || e.message);
      return rejectWithValue(e.response?.data || { message: "Add product failed" });
    }
  }
);

// Delete product by ID
export const deleteProductById = createAsyncThunk(
    "product/deleteProductById",
    async (productId, { rejectWithValue }) => {
        try {
            const headers = authHeader(true);
            const res = await axios.delete(`${API_BASE}/products/${productId}`, { headers });
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
            totalElements: 0,
            size: 10,
            first: true,
            last: false,
            numberOfElements: 0
        },
        loading: false,
        updateLoading: false,
        deleteLoading: false,
        error: null,
        successMessage: "",
        success: false,
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
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
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
            const responseData = action.payload.data;
            
            // Handle paginated response structure
            if (responseData.content) {
                // Paginated response
                state.products = responseData.content;
                state.pageInfo = {
                    page: responseData.number || 0,
                    totalPages: responseData.totalPages || 0,
                    totalElements: responseData.totalElements || 0,
                    size: responseData.size || 10,
                    first: responseData.first || true,
                    last: responseData.last || false,
                    numberOfElements: responseData.numberOfElements || 0
                };
            } else if (Array.isArray(responseData)) {
                // Non-paginated response (array)
                state.products = responseData;
                state.pageInfo = {
                    page: 0,
                    totalPages: 1,
                    totalElements: responseData.length,
                    size: responseData.length,
                    first: true,
                    last: true,
                    numberOfElements: responseData.length
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
            state.success = false;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = "Product added successfully!";
            
            // Add the new product to the beginning of the array
            if (Array.isArray(state.products) && action.payload.data) {
                state.products.unshift(action.payload.data);
                // Update total count
                state.pageInfo.totalElements += 1;
            }
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Add product failed";
            state.success = false;
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
                // Update total count
                state.pageInfo.totalElements -= 1;
            }
        })
        .addCase(deleteProductById.rejected, (state, action) => {
            state.deleteLoading = false;
            state.error = action.payload?.message || "Failed to delete product";
        });
    }
});

export const { clearProduct, setCurrentPage, clearMessages, setSuccessMessage, clearError, clearSuccess } = productSlice.actions;
export default productSlice.reducer;