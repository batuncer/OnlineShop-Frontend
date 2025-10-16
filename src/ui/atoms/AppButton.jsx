import { Button, CircularProgress } from "@mui/material";

const AppButton = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  fullWidth = false,
  onClick,
  type = "button",
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress size={16} color="inherit" /> : startIcon
      }
      endIcon={endIcon}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      sx={{
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: 2,
        bgcolor: "#8B4513",
        color: "white",
        boxShadow: "0 4px 8px rgba(139, 69, 19, 0.3)",
        "&:hover": {
          bgcolor: "#A0522D",
          boxShadow: "0 6px 12px rgba(139, 69, 19, 0.4)",
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "translateY(0px)",
        },
        "&:disabled": {
          bgcolor: "#D2B48C", 
          color: "rgba(255, 255, 255, 0.7)",
        },
        transition: "all 0.2s ease-in-out",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
