import React, { useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, logout } from "../features/auth/authSlice";

export default function UserPage() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((s)=>s.auth);

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
