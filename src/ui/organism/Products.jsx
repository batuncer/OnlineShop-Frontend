import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Pagination,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

// Organisms
import ProductCard from "./ProductCard";

// Product slice
import { 
  fetchProducts, 
  searchProducts, 
  setCurrentPage, 
  setSearchPage,
  clearSearch,
  setSearchQuery
} from "../../modules/product/productSlice";

// Cart slice
import { addItem } from "../../modules/cart/cartSlice";

const Products = () => {
  const { 
    products, 
    searchResults, 
    isSearching, 
    searchQuery,
    pageInfo, 
    searchPageInfo,
    loading, 
    searchLoading, 
    error 
  } = useSelector((state) => state.product);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = React.useState("");
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  // Fetch products on component mount and when page changes
  React.useEffect(() => {
    if (!isSearching) {
      dispatch(fetchProducts({ page: pageInfo.page, size: pageInfo.size }));
    }
  }, [dispatch, pageInfo.page, pageInfo.size, isSearching]);

  // Handle search with debounce
  React.useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      if (localSearchTerm.trim()) {
        dispatch(setSearchQuery(localSearchTerm.trim()));
        dispatch(searchProducts({ 
          query: localSearchTerm.trim(), 
          page: 0, 
          size: searchPageInfo.size 
        }));
      } else {
        dispatch(clearSearch());
      }
    }, 500); // 500ms debounce

    setSearchTimeout(timeout);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [localSearchTerm, dispatch, searchPageInfo.size]);

  // Get current data based on search state
  const currentProducts = isSearching ? searchResults : products;
  const currentPageInfo = isSearching ? searchPageInfo : pageInfo;
  const currentLoading = isSearching ? searchLoading : loading;

  // Handle page change
  const handlePageChange = (event, newPage) => {
    const apiPage = newPage - 1;
    
    if (isSearching) {
      dispatch(setSearchPage(apiPage));
      dispatch(searchProducts({ 
        query: searchQuery, 
        page: apiPage, 
        size: searchPageInfo.size 
      }));
    } else {
      dispatch(setCurrentPage(apiPage));
    }
  };

  // Handle clearing search
  const handleClearSearch = () => {
    setLocalSearchTerm("");
    dispatch(clearSearch());
  };

  // Handle adding product to basket
  const handleAddToBasket = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.typeName,
        price: product.priceGbp,
      })
    );
  };

  // Handle card click to navigate to product details
  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (currentLoading && (!currentProducts || currentProducts.length === 0)) {
    return (
      <Box sx={{ mx: { xs: 2, md: 8 }, mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} sx={{ mb: 2, color: "#8B4513" }} />
            <Typography variant="h6" color="text.secondary">
              {isSearching ? "Searching products..." : "Loading delicious products..."}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mx: { xs: 2, md: 8 }, mt: 8 }}>
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
          <Typography variant="h6">Oops! Something went wrong</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: { xs: 2, md: 32 }, mt: 4, mb: 6 }}>
      {/* Search Bar */}
      <Box sx={{ mb: 4, maxWidth: 600, mx: "auto", bgcolor: "white", borderRadius: 2 }}>
        <TextField
          fullWidth
          placeholder="Search products by name, category, or description..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#8B4513" }} />
              </InputAdornment>
            ),
            endAdornment: localSearchTerm && (
              <InputAdornment position="end">
                <ClearIcon 
                  sx={{ 
                    color: "#8B4513", 
                    cursor: "pointer",
                    "&:hover": { color: "#A0522D" }
                  }}
                  onClick={handleClearSearch}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&.Mui-focused fieldset": {
                borderColor: "#8B4513",
              },
            },
          }}
        />
      </Box>

      {/* Results Info */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        {isSearching ? (
          <Typography variant="h6" sx={{ color: "#8B4513" }}>
            {currentPageInfo.totalElements} result
            {currentPageInfo.totalElements !== 1 ? "s" : ""} found for "{searchQuery}"
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ color: "#8B4513" }}>
            {currentPageInfo.totalElements} product{currentPageInfo.totalElements !== 1 ? "s" : ""} available
          </Typography>
        )}

        {currentPageInfo.totalPages > 1 && (
          <Typography variant="body2" color="text.secondary">
            Page {currentPageInfo.page + 1} of {currentPageInfo.totalPages} • Showing{" "}
            {currentPageInfo.numberOfElements} products
          </Typography>
        )}
      </Box>

      {/* No Results Message */}
      {currentProducts.length === 0 && isSearching && !currentLoading && (
        <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid #8B4513",
            }}
          >
            <Typography variant="h6" sx={{ color: "#8B4513", mb: 1 }}>
              No products found for "{searchQuery}"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or{" "}
              <Box
                component="span"
                sx={{
                  color: "#8B4513",
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": { color: "#A0522D" },
                }}
                onClick={handleClearSearch}
              >
                clear search
              </Box>
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
              mb: 4,
            }}
          >
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.typeName,
                  price: product.priceGbp,
                  type: product.category,
                  description: product.description,
                }}
                handleAddToBasket={() => handleAddToBasket(product)}
                handleCardClick={() => handleCardClick(product.id)}
              />
            ))}
          </Box>

          {/* Pagination */}
          {currentPageInfo.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={currentPageInfo.totalPages}
                page={currentPageInfo.page + 1}
                onChange={handlePageChange}
                color="primary"
                size="large"
                disabled={currentLoading}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#8B4513",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    "&.Mui-selected": {
                      bgcolor: "#8B4513",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#A0522D",
                      },
                    },
                    "&:hover": {
                      bgcolor: "rgba(139, 69, 19, 0.1)",
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        !isSearching && !loading && (
          <Paper
            elevation={2}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid #8B4513",
            }}
          >
            <Typography variant="h6" sx={{ color: "#8B4513" }}>
              No products available
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please check back later for new products
            </Typography>
          </Paper>
        )
      )}

      {/* Loading overlay for search */}
      {currentLoading && currentProducts.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <CircularProgress size={60} sx={{ color: "#8B4513" }} />
        </Box>
      )}
    </Box>
  );
};

export default Products;
