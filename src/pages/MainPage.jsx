import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import coffeeMain from '../assets/coffeeMain.webp';
export default function MainPage() {
    return (
        <Typography align="center" sx={{ mt: 4 }}>
            <Stack alignItems="center" spacing={4} sx={{ mt: 2, mb: 4, mx: 20 }}>
                <img
                    src={coffeeMain}
                    alt="Coffee"
                    style={{
                        width: '100%',
                        height: '400px', 
                        borderRadius: '16px',
                        objectFit: 'cover'
                    }}
                />
            </Stack>
        </Typography>
    );
}