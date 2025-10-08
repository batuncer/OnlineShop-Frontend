import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderSchema } from "../validation/orderSchema";
import { createOrder, fetchOrderPreview } from "../modules/order/orderSlice";
import { clearCart } from "../modules/cart/cartSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { current } from "@reduxjs/toolkit";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const { preview, orderResult, loading, error, successMessage } = useSelector(
    (state) => state.order
  );
  const [openModal, setOpenModal] = useState(false);
  const [authWarning, setAuthWarning] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.id : null;

  const { handleSubmit } = useForm({
    resolver: zodResolver(orderSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (items.length > 0) {
      dispatch(fetchOrderPreview(items));
    }
  }, [items, dispatch]);

//   const onSubmit = () => {
//     if (!user) {
//       setAuthWarning(true);
//       return;
//     }

//     const orderData = {
//       userId: user.id,
//       items: preview
//         ? preview.items.map((i) => ({
//             productId: i.productId,
//             quantity: i.quantity,
//           }))
//         : [],
//       totalPrice: preview ? preview.totalPrice : 0,
//       shippingCost: preview ? preview.shippingCost : 0,
//       createdAt: new Date().toISOString(),
//     };

//     //dispatch
//     dispatch(createOrder({orderData, userId}));

//     setOpenModal(false);
//   };

  useEffect(() => {
    if (successMessage) {
      dispatch(clearCart());
    }
  }, [successMessage, dispatch]);

  if (loading && !preview) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (successMessage) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {successMessage}
        </Typography>
        <Typography variant="body1">
          Your order has been placed successfully.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, mx: "auto", maxWidth: 600, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {preview ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          {preview.items.map((item) => (
            <Box key={item.productId} sx={{ mb: 2 }}>
              <Typography>
                {item.productName} – Quantity: {item.quantity} – Price: £
                {item.perItemPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Subtotal: £{item.subTotal}
              </Typography>
            </Box>
          ))}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: £{preview.totalPrice}
          </Typography>
          <Typography variant="body1">
            Shipping: £{preview.shippingCost}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              disabled={loading || !user}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>No items in the cart.</Typography>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {authWarning && (
        <Typography
          color="error"
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Please log in to place an order.
        </Typography>
      )}

      {openModal && (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Confirm Order
          </Typography>
          <Typography>Are you sure you want to place this order?</Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{ mr: 2 }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CheckOutPage;
