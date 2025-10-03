import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/organism/RegisterForm";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s)=>s.auth);

  const handleSubmit = (data) => {
    dispatch(registerUser(data)).then((res)=>{
      if (res.meta.requestStatus === "fulfilled") navigate("/user/me");
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box sx={{ mt: 2 }}>
        <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
      </Box>
      <MuiLink component={Link} to="/login" sx={{ mt: 2, display: "inline-block" }}>
        Already have an account? Login
      </MuiLink>
    </Container>
  );
}
