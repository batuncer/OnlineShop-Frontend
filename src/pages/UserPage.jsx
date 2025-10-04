import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI ui
import { Container, Typography, Box, Button } from "@mui/material";

// Import fetchMe and logout actions
import { fetchMe, logout } from "../features/auth/authSlice";

export default function UserPage() {
  // Redux hooks
  const dispatch = useDispatch();

  // Get user and token from Redux state
  const { user, token } = useSelector((s)=>s.auth);

  // Fetch user details if token exists but user data is not loaded
  useEffect(()=>{
    if (token && !user) dispatch(fetchMe());
  }, [token, user, dispatch]);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>User Page</Typography>
      {user ? (
        <Box sx={{ mt: 2 }}>
          <Typography><b>Username:</b> {user.username}</Typography>
          <Typography><b>Email:</b> {user.email}</Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={()=>dispatch(logout())}>
            Logout
          </Button>
        </Box>
      ) : (
        <Typography color="error">Could not load user details.</Typography>
      )}
    </Container>
  );
}
