import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

const AppButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  fullWidth = false,
  onClick,
  type = 'button',
  sx = {},
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        borderRadius: 2,
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default AppButton;