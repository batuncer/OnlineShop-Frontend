// MUI ui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

const CartDrawer = ({ drawerOpen, cart, setDrawerOpen, handleRemoveFromCart, handleCheckout }) => {
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      {drawerOpen && (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Cart Items
          </Typography>
          {cart.items && cart.items.length > 0 ? (
            <>
              {cart.items.map((item, index) => (
                
                <Box key={index} sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2">Price: £{item.quantity > 1 ? item.price * item.quantity : item.price}</Typography>
                  <Divider />
                </Box>
              ))}
              {/* Total Items */}
              <Typography variant="body2" sx={{ p: 2 }}>
                Total Items: {cart.items.reduce((total, item) => total + item.quantity, 0)}
              </Typography>
              {/* Total Price */}
              <Typography variant="h6" sx={{ p: 2 }}>
                Total: £{cart.items.reduce((total, item) => total + item.price * item.quantity, 0)}
              </Typography>
                         <Typography variant="body2" sx={{ p: 2, color: 'gray' }}>
                Shipping cost calculated at checkout
              </Typography>
              <Button variant="outlined" color="secondary" sx={{ mt: 1, mr: 1 }} onClick={handleRemoveFromCart}>
                Clear
              </Button>
              <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleCheckout}>
                Checkout
              </Button>
   
            </>
          ) : (
            <Typography variant="body2" sx={{ p: 2 }}>
              No items in cart
            </Typography>
          )}
        </Box>
      )}
    </Drawer>
  );
};

export default CartDrawer;