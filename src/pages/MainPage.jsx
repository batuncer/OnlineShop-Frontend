// MUI
import { Stack, Typography } from '@mui/material';

// Image
import coffeeMain from '../assets/coffeeMain.webp';
import Products from '../ui/organism/Products';

export default function MainPage() {
    return (
        <Typography align="center" sx={{ mt: 4 }}>
            <Stack alignItems="center" spacing={4} maxWidth="xl" margin="auto" p={4}>
                <img
                    src={coffeeMain}
                    alt="Coffee"
                    style={{
                        width: '100%',
                        height: '600px', 
                        borderRadius: '16px',
                        objectFit: 'cover'
                    }}
                />
            </Stack>

            <Stack alignItems="center" spacing={2} mt={4}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to Coffee & Tea Shop
                </Typography>
                <Typography variant="h5" component="h2" color="text.secondary">
                    Discover the finest selection of coffee and tea from around the world.
                </Typography>
                <Products />
            </Stack>
        </Typography>
    );
}