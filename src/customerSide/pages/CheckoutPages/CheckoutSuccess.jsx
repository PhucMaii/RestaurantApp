import React from 'react';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSuccess() {
    const navigate = useNavigate();

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            gap={2}
            mt={20}
        >
            <CheckCircleIcon 
                color="success" 
                style={{fontSize: '50px'}}
            />  
            <Typography 
                fontWeight="bold" 
                variant="h4"
                textAlign="center"
                style={{color: green[900]}}
            >
                Order Placed Successfully
            </Typography>
            <Typography 
                fontWeight="bold" 
                variant="h6"
                textAlign="center"
            >
                Thank you for using our platform
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
                <Button 
                    color="success" 
                    onClick={() => navigate('/customer/home')}
                    variant="outlined"
                >
                    Back to Home
                </Button>
                <Button color="success" variant="contained">Check Order Status</Button>
            </Box>
        </Box>
    ) 
}
