import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// MUI Components
import { Container, Typography, Box, Paper, Fade, Avatar } from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";

// Import registerUser action
import { registerUser } from "../modules/auth/authSlice";

// Organisms
import RegisterForm from "../ui/organism/RegisterForm";

// Import background image
import coffeeBackground from "../assets/backgorund.webp";

export default function RegisterPage() {

  // Redux hooks
  const dispatch = useDispatch();

  // Router hook
  const navigate = useNavigate();

  // Get loading and error state from Redux
  const { loading, error } = useSelector((s) => s.auth);

  // Handle form submission
  const handleSubmit = (data) => {
    // Dispatch registerUser action
    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") navigate("/user/me");
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${coffeeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Fade in timeout={800}>
        <Container component="main" maxWidth="sm">
          <Paper 
            elevation={12}
            sx={{ 
              p: 6,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(139, 69, 19, 0.2)',
            }}
          >
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Avatar sx={{ 
                m: 1, 
                bgcolor: '#A0522D', 
                width: 56,
                height: 56,
                boxShadow: '0 4px 8px rgba(160, 82, 45, 0.3)',
              }}>
                <PersonAddIcon fontSize="large" />
              </Avatar>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  mb: 4, 
                  textAlign: 'center',
                  fontSize: '1.1rem',
                }}
              >
                Create your account to start
              </Typography>
              
              <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
              
              {/* Login Link */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    to="/login"
                    style={{
                      color: '#8B4513',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
}
