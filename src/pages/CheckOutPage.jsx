import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import {
  fetchOrderPreview,
  createOrder,
  resetOrderState,
} from "../modules/order/orderSlice";

import { clearCart } from "../modules/cart/cartSlice";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { preview, loading, error, successMessage } = useSelector(
    (state) => state.order
  );
  const [openModal, setOpenModal] = useState(false);
  const [authWarning, setAuthWarning] = useState(false);

  useEffect(() => {
    if (items && items.length > 0) {
      dispatch(fetchOrderPreview(items));
    }
  }, [items, dispatch]);

  const orderData = useMemo(() => {
    if (!items || items.length === 0) {
      return null;
    }

    return {
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
  }, [items]);

  const onSubmit = () => {
    if (!user) {
      setAuthWarning(true);
      return;
    }

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      console.error("No items to order");
      return;
    }
    dispatch(createOrder(orderData));
    dispatch(clearCart());
    setOpenModal(false);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(resetOrderState());
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, navigate]);

  if (loading && !preview) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} sx={{ color: "#8B4513" }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Alert
          severity="error"
          icon={<ErrorIcon fontSize="inherit" />}
          sx={{ mb: 2, borderRadius: 3 }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (successMessage) {
    return (
      <Fade in timeout={800}>
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Paper
            elevation={8}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "linear-gradient(145deg, #e8f5e8 0%, #f1f8e9 100%)",
              border: "2px solid #4caf50",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "success.main",
                width: 80,
                height: 80,
                mx: "auto",
                mb: 3,
              }}
            >
              <CheckCircleIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              color="success.main"
              gutterBottom
              fontWeight="bold"
            >
              Order Placed Successfully!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.1rem" }}
            >
              {successMessage}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Redirecting to home page...
            </Typography>
          </Paper>
        </Container>
      </Fade>
    );
  }

  return (
    <Fade in timeout={800}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: "95%", sm: "90%", md: "1200px", lg: "1400px" },
          mx: "auto",
          mt: 6,
          mb: 6,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Avatar
            sx={{
              bgcolor: "#8B4513",
              width: 80,
              height: 80,
              mx: "auto",
              mb: 3,
            }}
          >
            <ShoppingCartCheckoutIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h3"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "#8B4513" }}
          >
            Checkout
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Review your order and complete your purchase
          </Typography>
        </Box>

        {authWarning && (
          <Alert
            severity="warning"
            sx={{
              mb: 4,
              borderRadius: 3,
              fontSize: "1.1rem",
            }}
            onClose={() => setAuthWarning(false)}
          >
            Please log in to place an order
          </Alert>
        )}

        {/* Single Order Summary Card */}
        <Card
          elevation={6}
          sx={{
            borderRadius: 4,
            border: "2px solid #8B4513",
            background: "linear-gradient(145deg, #f5f5dc 0%, #ffffff 100%)",
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Avatar
                sx={{
                  bgcolor: "#8B4513",
                  mr: 3,
                  width: 48,
                  height: 48,
                }}
              >
                <ShoppingCartCheckoutIcon />
              </Avatar>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#8B4513" }}
              >
                Order Summary
              </Typography>
            </Box>

            <Divider sx={{ mb: 4, borderColor: "#8B4513", borderWidth: 1 }} />

            {/* Order Items */}
            {preview && preview.items ? (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "#8B4513", mb: 3 }}
                >
                  Items in Your Order
                </Typography>

                <List sx={{ mb: 4 }}>
                  {preview.items.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        px: 0,
                        py: 2,
                        borderBottom:
                          index < preview.items.length - 1
                            ? "1px solid #e0e0e0"
                            : "none",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            sx={{ color: "#8B4513", fontWeight: "bold" }}
                          >
                            {item.productName}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body1" color="text.secondary">
                              Quantity: <strong>{item.quantity}</strong>
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              Price per item:{" "}
                              <strong>£{item.perItemPrice}</strong>
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{ color: "#8B4513" }}
                        >
                          £{item.subTotal}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>

                <Divider
                  sx={{ my: 4, borderColor: "#8B4513", borderWidth: 1 }}
                />

                {/* Order Cost Summary */}
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "#8B4513", mb: 3 }}
                >
                  Cost Breakdown
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "#f9f9f9",
                          border: "1px solid #8B4513",
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          Subtotal
                        </Typography>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{ color: "#8B4513" }}
                        >
                          £{preview.totalPrice}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "#f9f9f9",
                          border: "1px solid #8B4513",
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          Shipping Cost
                        </Typography>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{ color: "#8B4513" }}
                        >
                          £{preview.shippingCost}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                {/* Total */}
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    background:
                      "linear-gradient(135deg, #f2a772ff 0%, #c9934dff 50%, #a47553ff 100%)",
                    color: "white",
                    borderRadius: 3,
                    mb: 4,
                  }}
                >
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    Total Amount
                  </Typography>
                  <Typography variant="h3" fontWeight="bold">
                    £{(preview.totalPrice + preview.shippingCost).toFixed(2)}
                  </Typography>
                </Paper>

                {/* Place Order Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    py: 2,
                    fontSize: "1.3rem",
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
                  onClick={() => setOpenModal(true)}
                  disabled={
                    !preview || !preview.items || preview.items.length === 0
                  }
                >
                  Place Order Now
                </Button>
              </>
            ) : (
              <Paper
                sx={{
                  p: 6,
                  textAlign: "center",
                  bgcolor: "#f5f5f5",
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Add some items to your cart to proceed with checkout
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#8B4513",
                    "&:hover": { bgcolor: "#A0522D" },
                  }}
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </Paper>
            )}
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        {openModal && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1300,
            }}
          >
            <Paper
              elevation={12}
              sx={{
                p: 5,
                maxWidth: 500,
                mx: 2,
                borderRadius: 4,
                border: "2px solid #8B4513",
              }}
            >
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: "#8B4513",
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <CheckCircleIcon fontSize="large" />
                </Avatar>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "#8B4513" }}
                >
                  Confirm Your Order
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{ mb: 4, textAlign: "center", fontSize: "1.1rem" }}
              >
                Are you sure you want to place this order for{" "}
                <strong>
                  £
                  {preview
                    ? (preview.totalPrice + preview.shippingCost).toFixed(2)
                    : "0.00"}
                </strong>
                ?
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  fullWidth
                  sx={{
                    py: 1.5,
                    bgcolor: "#8B4513",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#A0522D" },
                  }}
                >
                  Confirm Order
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenModal(false)}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderColor: "#8B4513",
                    color: "#8B4513",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#A0522D",
                      color: "#A0522D",
                      bgcolor: "rgba(139, 69, 19, 0.04)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Fade>
  );
};

export default CheckOutPage;
