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
} from "@mui/material";

// Components
import ProductCard from "./ProductCard";

// Product slice
import { fetchProducts } from "../../modules/product/productSlice";

// Cart slice
import { addItem } from "../../modules/cart/cartSlice";

const Products = () => {
  const { products, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Local state to track current page
  const [currentPage, setCurrentPage] = React.useState(0);

  // Fetch products on component mount and when page changes
  React.useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, size: 10 }));
  }, [dispatch, currentPage]);

  console.log("Products state:", { products, loading, error });
  console.log("Current page:", currentPage);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    // MUI Pagination is 1-based, convert to 0-based for API
    const apiPage = newPage - 1;
    console.log("Page change clicked:", { newPage, apiPage });
    setCurrentPage(apiPage);
    
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


  const productList = products?.content || [];
  const totalPages = products?.totalPages || 0;
  const totalElements = products?.totalElements || 0;
  const currentPageNumber = products?.number || 0;

  console.log("Extracted data:", {
    productList: productList.length,
    totalPages,
    totalElements,
    currentPageNumber
  });

  return (
    <Box sx={{ mx: { xs: 2, md: 32 }, mt: 4, mb: 6 }}>
      {/* Results Count and Page Info */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "#8B4513" }}>
          {totalElements} product{totalElements !== 1 ? "s" : ""} available
        </Typography>
        {totalPages > 1 && (
          <Typography variant="body2" color="text.secondary">
            Page {currentPageNumber + 1} of {totalPages} • Showing {productList.length} products
          </Typography>
        )}
      </Box>

      {/* Products Grid */}
      {productList.length > 0 ? (
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
            {productList.map((product) => (
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
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPageNumber + 1} 
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
                      }
                    },
                    "&:hover": {
                      bgcolor: "rgba(139, 69, 19, 0.1)",
                    }
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Paper
          elevation={2}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "#f5f5dc",
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
      )}
    </Box>
  );
};

export default Products;
