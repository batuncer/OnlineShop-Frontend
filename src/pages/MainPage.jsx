// MUI
import { Stack, Typography } from '@mui/material';

// Image
import coffeeMain from '../assets/coffeeMain.webp';

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
        </Typography>
    );
}