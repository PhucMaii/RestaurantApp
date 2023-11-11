import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Button, 
    Divider, 
    Grid, 
    IconButton, 
    TextField, 
    Typography, 
    useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { BoxShadowBackground } from './styles';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Loading from '../../components/Loading/Loading';
import EditAddress from '../../components/Modals/ChangeAddress/EditAddress';
import { calculateTotalInObject, formatToTwoDecimalPlace } from '../../../utils/number';

export default function CheckoutPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);
    const [note, setNote] = useState('');
    const [userData, setUserData] = useState({});
    const [curUser, setCurUser] = useLocalStorage('current-customer', {});
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const customerCollection = collection(db, 'customers');
    const customerDocRef = doc(customerCollection, curUser.userId);

    useEffect(() => {
        fetchUserData();
    }, [])
    
    const changeAddress = async (newAddress) => {
        try {
          await updateDoc(customerDocRef, { address: newAddress });
          setCurUser((prevData) => {
            return {...prevData, address: newAddress}
          })
          fetchUserData();
        } catch(error) {
          console.log(error);
        }
    };

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const docSnapshot = await getDoc(customerDocRef);
            const data = docSnapshot.data();
            const totalCartPrice = calculateTotalInObject(data.cart, 'totalPrice');
            setUserData({
                ...data,
                address: {
                    street: data.address.split(',')[0],
                    cityCountry: data.address.split(',').slice(1, 4).join(',')
                },
                totalCartPrice,
                tax: totalCartPrice * 0.12,
                totalPrice: totalCartPrice + (totalCartPrice * 0.12)
            });
            setIsLoading(false);
        } catch(error) {
            console.log(error);
            setIsLoading(false);
        }
    }   
    
    const paymentComponent = (
        <>
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${formatToTwoDecimalPlace(userData.totalCartPrice)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Tax</Typography>
                <Typography variant="body1">${formatToTwoDecimalPlace(userData.tax)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold" variant="h6">Total</Typography>
                <Typography fontWeight="bold" variant="h6">${formatToTwoDecimalPlace(userData.totalPrice)}</Typography>
            </Box>
            <Divider />
            <Typography fontWeight="bold" variant="h6" mb={2} mt={2}>Payment</Typography>
            <Grid container mb={2}>
                <Grid item xs={1}>
                    <CreditCardIcon />
                </Grid>
                <Grid item xs={8}>
                    <Typography fontWeight="bold" variant="body1">Credit Card</Typography>
                    <Typography fontWeight="bold" variant="body2">****6864</Typography>
                </Grid>
                <Grid item xs={3} textAlign="right" mb={3}>
                    <Button color="inherit" variant="contained" size='small'>
                        Edit
                    </Button>
                </Grid>
            </Grid>
            <Button fullWidth variant="contained">Place Order</Button>
        </>
    )

    return (
        <Grid 
            container 
            mt={2} 
            p={isSmallScreen ? 2 : 5} 
            rowGap={2}
        >
            <EditAddress 
                isOpen={isOpenAddressModal}
                onClose={() => setIsOpenAddressModal(false)}
                changeAddress={changeAddress}
            /> 
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Grid item xs={isSmallScreen ? 4 : 5}>
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <Typography textAlign="left" variant="h4" fontWeight="bold">Checkout</Typography>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid 
                                item 
                                xs={isSmallScreen ? 12 : 7}
                            >
                                <Grid container>
                                    <BoxShadowBackground 
                                        item 
                                        xs={12} 
                                        p={2}
                                        $isLargeScreen={!isSmallScreen}
                                    >
                                        <Typography 
                                            variant="h6" 
                                            fontWeight="bold" 
                                            mb={2}
                                        >
                                            Address
                                        </Typography>
                                        <Grid container mb={2}>
                                            <Grid item xs={1}>
                                                <LocationOnIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography 
                                                    fontWeight="bold"
                                                    variant="body1"
                                                >
                                                    {userData.address.street} 
                                                </Typography>
                                                <Typography variant="body2">
                                                    {userData.address.cityCountry}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} textAlign="right">
                                                <Button 
                                                    color="inherit"
                                                    onClick={() => setIsOpenAddressModal(true)}  
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Edit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid item xs={12}>
                                            <Typography variant="h6" fontWeight="bold" mb={2}>Order Summary</Typography>
                                            {
                                                userData.cart && userData.cart.map((restaurant, index) => {
                                                    return <OrderSummary 
                                                                key={index} 
                                                                restaurantCart={restaurant} 
                                                            />
                                                })
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography 
                                                fontWeight="bold" 
                                                variant="h6" 
                                                mb={2}
                                                mt={2}
                                            >
                                                Add Note
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                multiline
                                                placeholder="Write your note..."    
                                                rows={3}
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </Grid>
                                    </BoxShadowBackground>
                                    { isSmallScreen && 
                                        <>
                                            <Grid item xs={12} p={2}>
                                                {paymentComponent}
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            {
                                !isSmallScreen && (
                                    <BoxShadowBackground 
                                        item 
                                        ml={2}
                                        p={2} 
                                        xs={4} 
                                        $isLargeScreen={!isSmallScreen}
                                        $cardHeight='400px'
                                    >
                                        <Typography fontWeight="bold" variant="h6">Order Details</Typography> 
                                        {paymentComponent}
                                    </BoxShadowBackground>
                                )
                            }
                        </Grid>
                    </>
                )
            }

        </Grid>
  )
}
