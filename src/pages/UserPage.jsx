import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI ui
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Avatar,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import CancelIcon from "@mui/icons-material/Cancel";
import EmptyStateIcon from "@mui/icons-material/Assignment";

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
    // Dispatch an action to cancel the order . it will be implemented in the future after backend is ready
    console.log(`Cancel order with ID: ${orderId}`);

  };

  console.log("User orders from state:", orderList);

  if (loading) {
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
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} sx={{ mb: 2, color: "#8B4513" }} />
            <Typography variant="h6" color="text.secondary">
              Loading your profile...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 3,
            border: "2px solid #f44336",
          }}
        >
          <Typography variant="h6">Unable to load user details</Typography>
          <Typography variant="body2">Please try logging in again</Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Fade in timeout={800}>
      <Box>
        {/* Hero Header */}
        <Paper
          elevation={0}
          sx={{
            background:
              "linear-gradient(135deg, #f2a772ff 0%, #c9934dff 50%, #a47553ff 100%)",
            color: "white",
            py: 6,
            mb: 6,
            borderRadius: 0,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "rgba(255,255,255,0.2)",
                  border: "4px solid white",
                  mx: "auto",
                  mb: 3,
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Welcome, {user.username}!
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Manage your account and view your order history
              </Typography>
            </Box>
          </Container>
        </Paper>

        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", width: "1000px", mb: 3 }}>
          <Grid container spacing={4}>
            {/* User Details Column */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  border: "2px solid #8B4513",
                  background:
                    "linear-gradient(145deg, #f5f5dc 0%, #ffffff 100%)",
                  height: "fit-content",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#8B4513",
                        mr: 2,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h2"
                      fontWeight="bold"
                      sx={{ color: "#8B4513" }}
                    >
                      Profile Details
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, borderColor: "#8B4513" }} />

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        Username
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="medium"
                        sx={{ color: "#8B4513" }}
                      >
                        {user.username}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        Email Address
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="medium"
                        sx={{ color: "#8B4513" }}
                      >
                        {user.email}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        Account Role
                      </Typography>
                      <Chip
                        label={user.role}
                        sx={{
                          bgcolor: "#8B4513",
                          color: "white",
                          fontWeight: "bold",
                          mt: 1,
                        }}
                      />
                    </Box>
                  </Box>

                  <Button
                    sx={{
                      mt: 4,
                      width: "100%",
                      py: 1.5,
                      bgcolor: "#dc3545",
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: "#c82333",
                      },
                    }}
                    variant="contained"
                    startIcon={<LogoutIcon />}
                    onClick={() => dispatch(logout())}
                  >
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Order History Column */}
            <Grid item xs={12} md={8}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  border: "2px solid #8B4513",
                  background:
                    "linear-gradient(145deg, #f5f5dc 0%, #ffffff 100%)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center",  mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#8B4513",
                        mr: 2,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <ShoppingCartIcon />
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h2"
                      fontWeight="bold"
                      sx={{ color: "#8B4513" }}
                    >
                      Order History
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, borderColor: "#8B4513" }} />

                  {orderList && orderList.length > 0 ? (
                    <TableContainer
                      component={Paper}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        border: "1px solid #8B4513",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#f5f5dc" }}>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ color: "#8B4513" }}
                              >
                                Order ID
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ color: "#8B4513" }}
                              >
                                Date
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ color: "#8B4513" }}
                              >
                                Total Amount
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ color: "#8B4513" }}
                              >
                                Actions
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderList.map((order) => (
                            <TableRow
                              key={order.id}
                              hover
                              sx={{
                                "&:hover": {
                                  bgcolor: "rgba(139, 69, 19, 0.05)",
                                },
                              }}
                            >
                              <TableCell>
                                <Typography
                                  variant="body1"
                                  fontWeight="medium"
                                  sx={{ color: "#8B4513" }}
                                >
                                  #{order.id}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {formatMonthYear(order.orderDate)}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  sx={{ color: "#8B4513" }}
                                >
                                  £{order.totalAmount}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  startIcon={<CancelIcon />}
                                  onClick={() => cancelOrder(order.id)}
                                  sx={{
                                    fontWeight: "bold",
                                    borderWidth: 2,
                                    "&:hover": {
                                      borderWidth: 2,
                                    },
                                  }}
                                >
                                  Cancel
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Paper
                      elevation={1}
                      sx={{
                        p: 6,
                        textAlign: "center",
                        borderRadius: 3,
                        bgcolor: "#f9f9f9",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#8B4513",
                          width: 64,
                          height: 64,
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <EmptyStateIcon fontSize="large" />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: "#8B4513", mb: 1 }}>
                        No orders yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start shopping to see your orders here
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          mt: 3,
                          bgcolor: "#8B4513",
                          "&:hover": {
                            bgcolor: "#A0522D",
                          },
                        }}
                        onClick={() => (window.location.href = "/")}
                      >
                        Start Shopping
                      </Button>
                    </Paper>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
}
