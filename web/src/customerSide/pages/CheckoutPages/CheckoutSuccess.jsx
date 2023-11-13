import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { Timestamp, addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSuccess() {
    const [curUser, _setCurUser] = useLocalStorage('current-customer', {});
    const orderCollection = collection(db, 'orders');
    const customerCollection = collection(db, 'customers');
    const customerReference = doc(customerCollection, curUser.userId);
    const navigate = useNavigate();

    useEffect(() => {
        addOrderData();
    }, [])

    const fetchCartData = async () => {
        try {
            const docSnapshot = await getDoc(customerReference);
            const data = docSnapshot.data();
            return data.cart;
        } catch(error) {
            console.log(error);
        }
    }
    
    const addOrderData = async () => {
        try {
            const cartData = await fetchCartData();
            const promises = cartData.map(async (restaurant) => {
                await addDoc(orderCollection, {
                    items: [...restaurant.items],
                    note: restaurant.note,
                    orderTime: Timestamp.fromDate(new Date()),
                    customerName: curUser.userName,
                    customerEmail: curUser.email,
                    customerPhoneNumber: '',
                    restaurantId: restaurant.restaurantInfo.restaurantId,
                    orderStatus: 'Preparing'
                });
            });
            await Promise.all(promises);
        } catch(error) {
            console.log(error);
        }
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
