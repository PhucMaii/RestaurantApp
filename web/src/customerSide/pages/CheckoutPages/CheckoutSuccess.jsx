import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';

export default function CheckoutSuccess() {
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const getResponse = await axios.get('http://localhost:4000/order-data');
        console.log("GetResponse", getResponse);
        const getData = await getResponse.json();
        console.log("Data", getData);
    }
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
            textAlin="center"
        >
            Thank you for using our platform
        </Typography>
    </Box>
  )
}
