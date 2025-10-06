// MUI ui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const CartDrawer = ({ drawerOpen, cart, setDrawerOpen }) => {
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
            cart.items.map((item, index) => (
              <Box key={index} sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Typography variant="body2">Price: £{item.price}</Typography>
                <Divider />
                <Typography variant="body2">Total: £{item.quantity * item.price}</Typography>
              </Box>
            ))
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