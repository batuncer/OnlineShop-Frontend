import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

// MUI ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

// Molecules
import CartDrawer from '../molecules/CartDrawer';
import UserMenu from '../molecules/UserMenu';
import { clearCart, removeItem } from '../../modules/cart/cartSlice';

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

  //handle clear cart
  const handleClearCart = () => {
    // Clear the entire cart
    dispatch(clearCart({ productId: cart.items[0]?.id, quantity: 1 }));
  }

  //handle checkout
  const handleCheckout = () => {
    // Proceed to checkout
    navigate('/checkout');
    setDrawerOpen(false); // Close the drawer after navigating
  }

  // //handle remove from cart
  // const handleRemoveFromCart = () => {
  //   // Remove one item from the cart
  //   dispatch(removeItem({ productId: cart.items[0]?.id, quantity: 1 }));
  // }


  return (
    <AppBar position="static" style={{ backgroundColor: 'maroon' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disableGutters>
          <EmojiFoodBeverageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Totalitea
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings" >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton aria-label="cart">
                  <Badge badgeContent={Array.isArray(cart.items) ? cart.items.length : 0} showZero color="secondary">
                    <ShoppingCartIcon sx={{ color: 'white' }} onClick={() => setDrawerOpen(true)} />
                  </Badge >
                </IconButton>

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {auth.user ? (
                    <Avatar alt={(auth.user.username).toUpperCase()} src="/static/images/avatar/2.jpg" />
                  ) : (
                    <MenuIcon style={{ color: 'white' }} />
                  )}
                </IconButton>
              </Box>

            </Tooltip>
      
            <CartDrawer drawerOpen={drawerOpen} cart={cart} setDrawerOpen={setDrawerOpen} handleRemoveFromCart={handleClearCart} handleCheckout={handleCheckout} />

            <UserMenu
              anchorElUser={anchorElUser}
              handleCloseUserMenu={handleCloseUserMenu}
              auth={auth}
              dispatch={dispatch}
              navigate={navigate}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
