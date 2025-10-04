import { Menu, MenuItem, Typography } from "@mui/material";

const UserMenu = ({ anchorElUser, handleCloseUserMenu, auth, dispatch, navigate }) => {
  const pages = ['Account', 'Home', 'Login', 'Register', 'Logout'];

  const routes = {
    Home: '/',
    Account: '/user/me',
    Login: '/login',
    Register: '/register',
    Logout: '/',
  };

  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
     
{pages.map((setting) => {
  if (setting === 'Home') {
    return (
      <MenuItem key={setting} onClick={() => {
        handleCloseUserMenu();
        navigate(routes[setting], { replace: true });
      }}>
        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
      </MenuItem>
    );
  }

  if (auth.user && (setting === 'Login' || setting === 'Register')) return null;
  if (!auth.user && (setting === 'Account' || setting === 'Logout')) return null;

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
  );
};

export default UserMenu;