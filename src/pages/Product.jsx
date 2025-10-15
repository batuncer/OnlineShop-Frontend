import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../modules/product/productSlice";
import { addItem } from "../modules/cart/cartSlice";
// MUI Components
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
  Paper,
  Stack,
  Fade,
  Breadcrumbs,
  Link,
} from "@mui/material";

// MUI Icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Assets
import teaImage from "../assets/teaImage.jpg";
import coffeeImage from "../assets/coffeImage.webp";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.product);

  React.useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItem({
          id: product.id,
          name: product.typeName,
          price: product.priceGbp,
        })
      );

      // You could add a toast notification here
      console.log("Product added to cart:", product.typeName);
    }
  };

  // Get the image source based on the product type
  const getImage = () => {
    if (product?.category?.toLowerCase().includes("tea")) return teaImage;
    if (product?.category?.toLowerCase().includes("coffee")) return coffeeImage;
    return "https://via.placeholder.com/500x500";
  };

  // Get category icon
  const getCategoryIcon = () => {
    if (product?.category?.toLowerCase().includes("tea"))
      return <EmojiFoodBeverageIcon />;
    if (product?.category?.toLowerCase().includes("coffee"))
      return <LocalCafeIcon />;
    return null;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={80} sx={{ mb: 3, color: "#8B4513" }} />
            <Typography variant="h6" color="text.secondary">
              Loading product details...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 3,
            border: "1px solid #d32f2f",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Error loading product
          </Typography>
          <Typography variant="body2">{error}</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert
          severity="info"
          sx={{
            borderRadius: 3,
            border: "1px solid #0288d1",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Product not found
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            The product you're looking for doesn't exist or may have been
            removed.
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#8B4513", "&:hover": { bgcolor: "#A0522D" } }}
            onClick={() => navigate("/")}
          >
            Browse Products
          </Button>
        </Alert>
      </Container>
    );
  }

  const imageSrc = getImage();

  return (
    <Fade in timeout={800}>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 3 }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              sx={{
                cursor: "pointer",
                "&:hover": { color: "#8B4513" },
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </Link>
            <Typography color="#8B4513" fontWeight="bold">
              {product.typeName}
            </Typography>
          </Breadcrumbs>

          {/* Main Product Content */}
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              maxWidth: { xs: 600, md: 1000, lg: 1400 },
              mx: "auto",
            }}
          >
            {/* Product Image */}
            <Box sx={{ position: "relative", height: { xs: 400, md: 600 } }}>
              <CardMedia
                component="img"
                alt={product.typeName}
                image={imageSrc}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />

              {/* Category Badge */}
              <Chip
                icon={getCategoryIcon()}
                label={product.category}
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  bgcolor: "rgba(139, 69, 19, 0.95)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                }}
              />
            </Box>

            {/* Product Details */}
            <CardContent
              sx={{
                p: { xs: 3, md: 5, lg: 8 },
              }}
            >
              <Stack spacing={3}>
                {/* Product Header */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#8B4513",
                      fontSize: { xs: "1.8rem", md: "2.5rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    {product.typeName}
                  </Typography>

                  {/* Product ID */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Product ID: #{product.id}
                  </Typography>

                  {/* Price */}
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#8B4513",
                      fontWeight: "bold",
                      fontSize: { xs: "2rem", md: "3rem" },
                    }}
                  >
                    £{product.priceGbp?.toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: "#8B4513", opacity: 0.3 }} />

                {/* Product Description */}
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight="bold"
                    sx={{
                      color: "#8B4513",
                      mb: 2,
                    }}
                  >
                    Description
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                      textAlign: "center",
                    }}
                  >
                    {product.description ||
                      "Experience the finest quality with this premium product, carefully selected and crafted to deliver exceptional taste and aroma."}
                  </Typography>
                </Box>

                {/* Product Details Grid */}
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight="bold"
                    sx={{
                      color: "#8B4513",
                      mb: 2,
                    }}
                  >
                    Product Details
                  </Typography>

                  <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: "center",
                          bgcolor: "#f5f5dc",
                          border: "1px solid #8B4513",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Supplier
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {product.supplierName} 
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: "center",
                          bgcolor: "#f5f5dc",
                          border: "1px solid #8B4513",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Category
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {product.category}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: "center",
                          bgcolor: "#f5f5dc",
                          border: "1px solid #8B4513",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Type
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {product.typeName}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: "center",
                          bgcolor: "#f5f5dc",
                          border: "1px solid #8B4513",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Weight
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {product.amountGrams}g
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAddToCart}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      bgcolor: "#8B4513",
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(139, 69, 19, 0.3)",
                      "&:hover": {
                        bgcolor: "#A0522D",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(139, 69, 19, 0.4)",
                      },
                      "&:disabled": {
                        bgcolor: "#ccc",
                        color: "#666",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Add to Basket
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Paper>

          {/* Additional Information Section */}
          <Box sx={{ mt: 4 }}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Why Choose This Product?
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <LocalCafeIcon
                      sx={{ fontSize: 48, color: "#8B4513", mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Premium Quality
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sourced from the finest regions and carefully processed
                      for exceptional taste
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <EmojiFoodBeverageIcon
                      sx={{ fontSize: 48, color: "#8B4513", mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Expert Selection
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hand-picked by our experts to ensure only the best
                      products reach you
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default Product;
