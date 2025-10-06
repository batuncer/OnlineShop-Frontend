import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// MUI
import { Pagination, Stack, Typography } from "@mui/material";

// Organism
import ProductCard from "./ProductCard";

// Product slice
import { fetchProducts } from "../../modules/product/productSlice";

// Cart slice
import { addItem } from "../../modules/cart/cartSlice";

const Products = () => {
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch products on component mount
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle adding product to basket
  const handleAddToBasket = (product) => {
    dispatch(addItem({
      id: product.id,
      name: product.typeName,
      price: product.priceGbp,
    }));
    
  };

  // Handle card click to navigate to product details
  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  console.log("Products state:", products);

  if (products.loading) return <Typography>Loading...</Typography>;
  if (products.error) return <Typography>Error: {products.error}</Typography>;

  return (
    <>
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {Array.isArray(products.products?.content) &&
          products.products.content.map((product) => (
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
      </Stack>
      <Pagination count={products.products.totalPages} style={{ marginBottom: "20px" }} />
    </>
    
  );
};

export default Products;
