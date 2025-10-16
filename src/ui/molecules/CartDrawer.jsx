import React from 'react';

// MUI ui
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  Paper,
  Avatar,
  Chip,
  Stack,
  Badge
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalShipping as ShippingIcon,
  ShoppingBag as CheckoutIcon
} from '@mui/icons-material';
import AppButton from '../atoms/AppButton';

const CartDrawer = ({ drawerOpen, cart, setDrawerOpen, handleRemoveFromCart, handleCheckout, handleAddToCart, handleDecreaseFromCart }) => {

  // Calculate totals
  const totalItems = cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;
  const totalPrice = cart.items ? cart.items.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;

  return (
    <Drawer 
      anchor="right" 
      open={drawerOpen} 
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 400,
          background: 'linear-gradient(180deg, #f5f5dc 0%, #ffffff 100%)'
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Paper 
          elevation={3}
          sx={{ 
            p: 3,
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            color: 'white',
            borderRadius: 0
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                <ShoppingCartIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Shopping Cart
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {totalItems} item{totalItems !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Box>
            <IconButton 
              onClick={() => setDrawerOpen(false)}
              sx={{ 
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Cart Content */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {cart.items && cart.items.length > 0 ? (
            <Stack spacing={2}>
              {cart.items.map((item, index) => (
                <Paper 
                  key={index} 
                  elevation={2}
                  sx={{ 
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid #8B4513',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(139, 69, 19, 0.15)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="h6" 
                        fontWeight="bold"
                        sx={{ color: '#8B4513', mb: 1 }}
                      >
                        {item.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Chip 
                          label={`Qty: ${item.quantity}`}
                          size="small"
                          sx={{ 
                            bgcolor: '#8B4513',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          £{item.price.toFixed(2)} each
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        fontWeight="bold"
                        sx={{ color: '#8B4513' }}
                      >
                        £{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                    
                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                      <IconButton 
                        size="small"
                        sx={{ 
                          bgcolor: '#8B4513',
                          color: 'white',
                          mb: 1,
                          '&:hover': { bgcolor: '#A0522D' }
                        }}
                      >
                        <AddIcon fontSize="small" onClick={() => handleAddToCart(item)} />
                      </IconButton>
                      
                      <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      
                      <IconButton
                        size="small"
                        sx={{ 
                          bgcolor: '#8B4513',
                          color: 'white',
                          mt: 1,
                          '&:hover': { bgcolor: '#A0522D' }
                        }}
                      >
                        <RemoveIcon fontSize="small" onClick={() => handleDecreaseFromCart(item.id)} />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Paper 
              elevation={1}
              sx={{ 
                p: 6, 
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: '#f9f9f9'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: '#8B4513',
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <ShoppingCartIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ color: '#8B4513', mb: 1 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add some delicious products to get started!
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Footer with totals and actions */}
        {cart.items && cart.items.length > 0 && (
          <Paper 
            elevation={6}
            sx={{ 
              p: 3,
              bgcolor: '#f5f5dc',
              border: '2px solid #8B4513',
              borderRadius: 0
            }}
          >
            {/* Shipping Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShippingIcon sx={{ color: '#8B4513', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Shipping cost calculated at checkout
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 2, borderColor: '#8B4513' }} />
            
            {/* Total Summary */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Items ({totalItems}):
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  £{totalPrice.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#8B4513' }}>
                  Subtotal:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#8B4513' }}>
                  £{totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Box>
            
            {/* Action Buttons */}
            <Stack spacing={2}>
              <AppButton 
                variant="contained"
                fullWidth
                size="large"
                startIcon={<CheckoutIcon />}
                onClick={handleCheckout}
                sx={{ 
                  py: 1.5,
                  bgcolor: '#8B4513',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#A0522D'
                  }
                }}
              >
                Proceed to Checkout
              </AppButton>
              
              <AppButton 
                variant="outlined"
                fullWidth
                startIcon={<DeleteIcon />}
                onClick={handleRemoveFromCart}
                sx={{ 
                  py: 1,
                  color: '#dc3545',
                  borderColor: '#dc3545',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(220, 53, 69, 0.1)',
                    borderColor: '#c82333'
                  }
                }}
              >
                Clear Cart
              </AppButton>
            </Stack>
          </Paper>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;