import React from 'react';
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

const paymentComponent = (
    <>
        <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">$40.00</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body1">Tax</Typography>
            <Typography variant="body1">$6.00</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold" variant="h6">Total</Typography>
            <Typography fontWeight="bold" variant="h6">$46.00</Typography>
        </Box>
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
        <Divider />
    </>
)

export default function CheckoutPage() {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <Grid 
            container 
            mt={2} 
            p={isSmallScreen ? 2 : 5} 
            rowGap={2}
        >
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
                                    <Typography variant="body1" fontWeight="bold">1805 Sixth Avenue</Typography>
                                    <Typography variant="body2">New Westminster, BC V3M 2E1</Typography>
                                </Grid>
                                <Grid item xs={3} textAlign="right">
                                    <Button color="inherit" variant="contained" size='small'>
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight="bold" mb={2}>Order Summary</Typography>
                                <OrderSummary />
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
                                    rows={3}
                                    placeholder="Write your note..."    
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
        </Grid>
  )
}
