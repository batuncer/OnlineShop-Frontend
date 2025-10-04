import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartDrawer from '../molecules/CartDrawer';


const pages = ['Account', 'Home', 'Login', 'Register', 'Logout'];

function ResponsiveAppBar() {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'maroon' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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

          <Typography variant="h5" noWrap component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
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

            <CartDrawer drawerOpen={drawerOpen} cart={cart} setDrawerOpen={setDrawerOpen} />

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((setting) => {
                // Hide Login/Register if user is logged in
                if (auth.user && (setting === 'Login' || setting === 'Register')) return null;

                // Hide Account/Logout if user is not logged in
                if (!auth.user && (setting === 'Account' || setting === 'Logout')) return null;

                // Define navigation targets
                const routes = {
                  Home: '/',
                  Account: '/user/me',
                  Login: '/login',
                  Register: '/register',
                  Logout: '/',
                };

                // Handle Logout separately
                if (setting === 'Logout') {
                  return (
                    <MenuItem key={setting} onClick={() => {
                      dispatch({ type: 'auth/logout' });
                      handleCloseUserMenu();
                      navigate('/');
                    }}>
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                  );
                }

                // Default navigation items
                return (
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu();
                    navigate(routes[setting]);
                  }}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
