import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/organism/LoginForm";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s)=>s.auth);

  const handleSubmit = (data) => {
    dispatch(loginUser(data)).then((res)=>{
      if (res.meta.requestStatus === "fulfilled") navigate("/user");
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Box sx={{ mt: 2 }}>
        <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
      </Box>
      <MuiLink component={Link} to="/register" sx={{ mt: 2, display: "inline-block" }}>
        Create an account
      </MuiLink>
    </Container>
  );
}
