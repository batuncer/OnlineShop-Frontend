import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI ui
import { Container, Typography, Box, Button } from "@mui/material";

// Import logout actions
import { logout } from "../modules/auth/authSlice";

// Import fetchMe action
import { fetchMe } from "../modules/user/userSlice";
import { getUserOrders } from "../modules/user/userSlice";
import formatMonthYear from "../utils/cusTomDate";

export default function UserPage() {
  // Redux hooks
  const dispatch = useDispatch();

  // Get user and token from Redux state
  const { user, loading, orderList } = useSelector((s) => s.user);

  // Fetch user details if token exists
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const cancelOrder = (orderId) => {
    // Dispatch an action to cancel the order
    console.log(`Cancel order with ID: ${orderId}`);
    // You can implement the actual cancellation logic here
  };

  console.log("User orders from state:", orderList);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        User Page
      </Typography>
      {loading && <Typography>Loading user details...</Typography>}
      {user ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <Typography>
              <b>Username:</b> {user.username}
            </Typography>
            <Typography>
              <b>Email:</b> {user.email}
            </Typography>
            <Typography>
              <b>Role:</b> {user.role}
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography>
              <b>Order List:</b>
            </Typography>
            <ul>
              {orderList.map((order) => (
                <li key={order.id}>
                  {order.id} - {formatMonthYear(order.orderDate)} - £
                  {order.totalAmount}{" "}
                  <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel Order
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </Box>
        </>
      ) : (
        <Typography color="error">Could not load user details.</Typography>
      )}
    </Container>
  );
}
