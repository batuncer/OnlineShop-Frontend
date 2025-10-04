import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Import loginUser action
import { loginUser } from "../features/auth/authSlice";

// Organisms
import LoginForm from "../ui/organism/LoginForm";

export default function LoginPage() {

  // Redux hooks
  const dispatch = useDispatch();

  // Router hook
  const navigate = useNavigate();

  // Select loading and error state from auth slice
  const { loading, error } = useSelector((s)=>s.auth);

  // Handle form submission
  const handleSubmit = (data) => {
    // Dispatch loginUser action
    dispatch(loginUser(data)).then((res)=>{
      if (res.meta.requestStatus === "fulfilled") navigate('/');
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
