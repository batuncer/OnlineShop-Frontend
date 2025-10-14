import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

// MUI ui
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Badge,
  Button,
  useScrollTrigger,
  Slide,
  Paper
} from '@mui/material';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

// Molecules
import CartDrawer from '../molecules/CartDrawer';
import UserMenu from '../molecules/UserMenu';
import { addItem, clearCart, decreaseQuantity } from '../../modules/cart/cartSlice';

// Hide navbar on scroll component
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Redux and Router hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handlers for user menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Close user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate('/checkout');
    setDrawerOpen(false);
  };

  // Handle logo click
  const handleLogoClick = () => {
    navigate('/');
  };

   const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  // Handle decrease item quantity
  const handleDecreaseFromCart = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={4}
        sx={{
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.3)'
        }}
      >
        <Box sx={{ mx: { xs: 2, md: 32 } }}>
          <Toolbar sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            py: 1
          }}>
            
            {/* Logo Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={handleLogoClick}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <EmojiFoodBeverageIcon 
                  sx={{ 
                    fontSize: 32,
                    color: 'white'
                  }} 
                />
              </Paper>
              
              <Typography 
                variant="h4" 
                component="div"
                sx={{
                  fontFamily: '"Dancing Script", cursive',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                Totalitea
              </Typography>

              {/* Mobile Logo */}
              <Typography 
                variant="h5" 
                component="div"
                sx={{
                  fontFamily: '"Dancing Script", cursive',
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  display: { xs: 'block', md: 'none' }
                }}
              >
                Totalitea
              </Typography>
            </Box>

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              
              {/* Cart Icon */}
              <Tooltip title="Shopping Cart" arrow>
                <IconButton 
                  onClick={() => setDrawerOpen(true)}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Badge 
                    badgeContent={Array.isArray(cart.items) ? cart.items.length : 0} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        bgcolor: '#ff6b6b',
                        color: 'white',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    <ShoppingCartIcon sx={{ color: 'white', fontSize: 28 }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              <Tooltip title={auth.user ? "Account Settings" : "Menu"} arrow>
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {auth.user ? (
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        bgcolor: '#D2691E',
                        border: '2px solid white',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {auth.user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : (
                    <PersonIcon sx={{ color: 'white', fontSize: 28 }} />
                  )}
                </IconButton>
              </Tooltip>

              {/* Quick Login/Logout for Desktop */}
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {auth.user ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      dispatch({ type: "auth/logout" });
                      navigate("/");
                    }}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: '#f5f5dc',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/login")}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: '#f5f5dc',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Box>

        {/* Cart Drawer */}
        <CartDrawer 
          drawerOpen={drawerOpen} 
          cart={cart} 
          setDrawerOpen={setDrawerOpen} 
          handleRemoveFromCart={handleClearCart} 
          handleCheckout={handleCheckout} 
          handleAddToCart={handleAddToCart}
          handleDecreaseFromCart={handleDecreaseFromCart}
        />

        {/* User Menu */}
        <UserMenu
          anchorElUser={anchorElUser}
          handleCloseUserMenu={handleCloseUserMenu}
          auth={auth}
          dispatch={dispatch}
          navigate={navigate}
        />
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;