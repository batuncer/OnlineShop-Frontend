import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// MUI components
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";

// Import registerUser action
import { registerUser } from "../features/auth/authSlice";
// Organisms
import RegisterForm from "../components/organism/RegisterForm";

export default function RegisterPage() {

  // Redux hooks
  const dispatch = useDispatch();

  // Router hook
  const navigate = useNavigate();

  // Get loading and error state from Redux
  const { loading, error } = useSelector((s)=>s.auth);

  // Handle form submission
  const handleSubmit = (data) => {
    // Dispatch registerUser action
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
