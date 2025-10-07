import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../modules/product/productSlice";
import {
  Button,
  Typography,
  CircularProgress,
  Box,
  CardMedia,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { addItem } from "../modules/cart/cartSlice";

// Assets
import teaImage from "../assets/teaImage.jpg";
import coffeeImage from "../assets/coffeImage.webp";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  // Get the image source based on the product type
  const getImage = () => {
    if (product?.product?.category.toLowerCase().includes("tea")) return teaImage;
    if (product?.product?.category.toLowerCase().includes("coffee")) return coffeeImage;
    return "https://via.placeholder.com/140";
  };

   // Get the image source
  const imageSrc = getImage();

  if (!product) return null;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>

      {product.product?.loading && <CircularProgress />}
      {product.product?.error && (
        <Typography color="error">Error: {product.error}</Typography>
      )}

      {product.product && (
        <Box sx={{ marginTop: 2 }}>
          <CardMedia
            component="img"
            alt={product.product.name}
            image={imageSrc}
            sx={{
              height: 255,
              width: 255,
              objectFit: "cover", // or 'contain' depending on your preference
            }}
          />
          <Typography variant="h5">{product.product.name}</Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {product.product.description} Our advice is per cup: {product.product.recommendedGramsPerCup}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Price: £{product.product.priceGbp.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Category: {product.product.category}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Supplier: {product.product.supplierId}{" "}
            {/* gonna implement name later when we have supplier data */}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Stock: {product.product.stockQuantity}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={() => handleAddToCart(product.product)}
          >
            Add to Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Product;
