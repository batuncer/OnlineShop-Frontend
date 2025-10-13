import { Container, Typography, Box, Paper, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  } from "@mui/material";
import { Avatar } from "@mui/material";
// Import loginUser action
import { loginUser } from "../modules/auth/authSlice";

// Organisms
import LoginForm from "../ui/organism/LoginForm";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
    <Fade in timeout={800}>
      <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
        <Paper 
          elevation={8}
          sx={{ 
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
          }}
        >
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Avatar sx={{ 
              m: 1, 
              bgcolor: 'primary.main',
              width: 56,
              height: 56
            }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            
            <Typography 
              component="h1" 
              variant="h3"
              sx={{ 
                mb: 4,
                fontWeight: 'bold',
                color: 'primary.main',
                textAlign: 'center'
              }}
            >
              Sign In
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 4, textAlign: 'center' }}
            >
              Welcome back! Please sign in to your account
            </Typography>
            
           <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
}