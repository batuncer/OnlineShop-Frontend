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
import { Search as SearchIcon } from "@mui/icons-material";

// Organisms
import ProductCard from "./ProductCard";

// Product slice
import { fetchProducts, setCurrentPage } from "../../modules/product/productSlice";

// Cart slice
import { addItem } from "../../modules/cart/cartSlice";

const Products = () => {
  const { products, pageInfo, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  // Fetch products on component mount and when page changes
  React.useEffect(() => {
    dispatch(fetchProducts({ page: pageInfo.page, size: pageInfo.size }));
  }, [dispatch, pageInfo.page, pageInfo.size]);


  const productList = products || [];
  
  // Filter products based on search term
  const filteredProducts = productList.filter(
    (product) =>
      product.typeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle page change
  const handlePageChange = (event, newPage) => {
    // MUI Pagination is 1-based, convert to 0-based for API
    const apiPage = newPage - 1;
    console.log("Page change clicked:", { newPage, apiPage });
    dispatch(setCurrentPage(apiPage));
    // Clear search when changing pages
    setSearchTerm("");
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

  if (loading) {
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
              Loading delicious products...
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
      <Box sx={{ mb: 4 , maxWidth: 600, mx: "auto", bgcolor:"white", borderRadius: 2 }}>
        <TextField
          fullWidth
          placeholder="Search products by name, category, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#8B4513" }} />
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

      <Box sx={{ mb: 3, textAlign: "center" }}>
        {searchTerm ? (
          <Typography variant="h6" sx={{ color: "#8B4513" }}>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found for "{searchTerm}"
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ color: "#8B4513" }}>
            {pageInfo.totalElements} product{pageInfo.totalElements !== 1 ? "s" : ""} available
          </Typography>
        )}

        {!searchTerm && pageInfo.totalPages > 1 && (
          <Typography variant="body2" color="text.secondary">
            Page {pageInfo.page + 1} of {pageInfo.totalPages} • Showing{" "}
            {pageInfo.numberOfElements} products
          </Typography>
        )}
      </Box>

      {/* No Results Message */}
      {filteredProducts.length === 0 && searchTerm && (
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
              No products found for "{searchTerm}"
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
                onClick={() => setSearchTerm("")}
              >
                clear search
              </Box>
            </Typography>
          </Paper>
        </Box>
      )}

      {(searchTerm ? filteredProducts : productList).length > 0 ? (
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
            {(searchTerm ? filteredProducts : productList).map((product) => (
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

          {/* Pagination - Only show when not searching */}
          {!searchTerm && pageInfo.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={pageInfo.totalPages}
                page={pageInfo.page + 1}
                onChange={handlePageChange}
                color="primary"
                size="large"
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

          {searchTerm && filteredProducts.length > 10 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Typography variant="body2">
                Showing all {filteredProducts.length} search results
              </Typography>
            </Box>
          )}
        </>
      ) : (
        !searchTerm && (
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
    </Box>
  );
};

export default Products;
