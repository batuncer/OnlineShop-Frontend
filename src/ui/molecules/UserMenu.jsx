//MUI components and icons
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";

const UserMenu = ({
  anchorElUser,
  handleCloseUserMenu,
  auth,
  dispatch,
  navigate,
}) => {
  // Menu items with icons
  const menuItems = [
    {
      name: "Home",
      route: "/",
      icon: <HomeIcon />,
      showWhen: "always",
      color: "#2196f3",
    },
    {
      name: "Account",
      route: "/user/me",
      icon: <AccountIcon />,
      showWhen: "authenticated",
      color: "#4caf50",
    },
    {
      name: "Login",
      route: "/login",
      icon: <LoginIcon />,
      showWhen: "unauthenticated",
      color: "#ff9800",
    },
    {
      name: "Register",
      route: "/register",
      icon: <RegisterIcon />,
      showWhen: "unauthenticated",
      color: "#9c27b0",
    },
    {
      name: "Logout",
      route: "/",
      icon: <LogoutIcon />,
      showWhen: "authenticated",
      color: "#f44336",
      isLogout: true,
    },
    {
      name: "Admin",
      route: "/admin",
      icon: <PersonIcon />,
      isAdmin: "authorized",
      color: "#ff5722",
    },
  ];

  const handleMenuItemClick = (item) => {
    if (item.isLogout) {
      dispatch({ type: "auth/logout" });
      navigate("/");
    } else {
      navigate(item.route, item.name === "Home" ? { replace: true } : {});
    }
    handleCloseUserMenu();
  };

  const shouldShowItem = (item) => {
    if (item.showWhen === "always") return true;
    if (item.showWhen === "authenticated") return !!auth.user;
    if (item.showWhen === "unauthenticated") return !auth.user;
    return false;
  };

  const isAdmin = () => {
    return auth.user && auth.user.role === "ADMIN";
  };

  return (
    <Menu
      sx={{
        mt: "45px",
        "& .MuiPaper-root": {
          borderRadius: 3,
          minWidth: 200,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.05)",
        },
      }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {/* User Info Header */}
      {auth.user && (
        <>
          <Box sx={{ px: 3, py: 2, bgcolor: "#f5f5f5" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#8B4513",
                  width: 40,
                  height: 40,
                  fontSize: "1rem",
                }}
              >
                {auth.user.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {auth.user.username}
                </Typography>
                <Chip
                  label={auth.user.role || "User"}
                  size="small"
                  color="primary"
                  sx={{ fontSize: "0.75rem" }}
                />
              </Box>
            </Box>
          </Box>
          <Divider />
        </>
      )}

      {/* Menu Items */}
      {isAdmin() && (
        <MenuItem
          onClick={() => {
            navigate("/admin");
            handleCloseUserMenu();
          }}
          sx={{
            py: 1.5,
            px: 3,
            "&:hover": {
              bgcolor: "#ff572215",
              "& .MuiListItemIcon-root": {
                color: "#ff5722",
              },
              "& .MuiTypography-root": {
                color: "#ff5722",
                fontWeight: "medium",
              },
            },
            transition: "all 0.2s ease",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "text.secondary",
              transition: "color 0.2s ease",
            }}
          >
            <PersonIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: "0.95rem", transition: "all 0.2s ease" }}>
            Admin
          </Typography>
        </MenuItem>
      )}

      {menuItems.filter(shouldShowItem).map((item, index) => (
        <MenuItem
          key={item.name}
          onClick={() => handleMenuItemClick(item)}
          sx={{
            py: 1.5,
            px: 3,
            "&:hover": {
              bgcolor: `${item.color}15`,
              "& .MuiListItemIcon-root": {
                color: item.color,
              },
              "& .MuiTypography-root": {
                color: item.color,
                fontWeight: "medium",
              },
            },
            transition: "all 0.2s ease",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "text.secondary",
              transition: "color 0.2s ease",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <Typography
            sx={{
              fontSize: "0.95rem",
              transition: "all 0.2s ease",
            }}
          >
            {item.name}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
