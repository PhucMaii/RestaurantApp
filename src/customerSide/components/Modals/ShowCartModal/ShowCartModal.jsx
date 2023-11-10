import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
    CircularProgress, 
    Divider, 
    Grid, 
    IconButton, 
    Modal, 
    Typography 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { GridModal } from '../styles';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase.config';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { calculateTotalInObject, formatToTwoDecimalPlace } from '../../../../utils/number';
import { grey } from '@mui/material/colors';
import { GoBackButton, ToCheckoutButton } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import NumberTextField from '../../NumberTextField/NumberTextField';

export default function ShowCartModal({ open, onClose }) {
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [curUser, _setCurUser] = useLocalStorage('current-customer', {});
    const navigate = useNavigate();
    const { id } = useParams();
    const customerCollection = collection(db, 'customers');
    const customerDocRef = doc(customerCollection, curUser.userId);

    useEffect(() => {
        fetchCart();
    }, [])

    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const docSnapshot = await getDoc(customerDocRef);
            const data = docSnapshot.data();
            if(data.cart) {
                setCart(data.cart);
            }
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const handleDeleteItem = async (restaurantName, item) => {
        try {
            let restaurantHasItem = cart.find((restaurant) => restaurant.restaurantInfo.restaurantName === restaurantName); 
            restaurantHasItem.items = restaurantHasItem.items.filter((itemDelete) => {
                return itemDelete.name !== item.name ||
                        itemDelete.price !== item.price ||
                        !isEqual(itemDelete.options, item.options);
            })
            let newCart;
            // if there is no items in that restaurant after filter, then remove restaurant from cart
            if(restaurantHasItem.items.length === 0) {
                newCart = cart.filter((restaurant) => {
                    return restaurant.restaurantInfo.restaurantName !== restaurantName;
                })
            } else {
                const newTotalPrice = calculateTotalInObject(restaurantHasItem.items, 'price');
                newCart = cart.map((restaurant) => {
                    if(restaurant.restaurantInfo.restaurantName === restaurantName) {
                        return {
                            ...restaurant,
                            items: restaurantHasItem.items,
                            totalPrice: newTotalPrice
                        };
                    }
                    else {
                        return restaurant;
                    }
                })
            }
            await updateDoc(customerDocRef, {cart: [...newCart]});
            setCart(newCart);
        } catch(error) {
            console.log(error);
        }
    }

    const handleManipulateQuantity = async (targetItem, restaurantName, operator) => {
        try {
            let restaurantHasItem = cart.find((restaurant) => restaurant.restaurantInfo.restaurantName === restaurantName); 
            restaurantHasItem.items = restaurantHasItem.items.map((item) => {
                if(targetItem.name === item.name &&
                    targetItem.price === item.price &&
                    isEqual(targetItem.options, item.options)) {
                        let newQuantity = 1;
                        if(operator === 'increment') {
                            newQuantity = item.quantity + 1;
                        } else {
                            if(item.quantity > 1) {
                                newQuantity = item.quantity - 1;
                            }
                        }
                        return {
                            ...item,
                            quantity: newQuantity,
                            totalPrice: item.price * newQuantity
                        }
                } else {
                    return item;
                }
                
            })
            let newCart;
            const newTotalPrice = calculateTotalInObject(restaurantHasItem.items, 'totalPrice');
            newCart = cart.map((restaurant) => {
                if(restaurant.restaurantInfo.restaurantName === restaurantName) {
                    return {
                        ...restaurant,
                        items: restaurantHasItem.items,
                        totalPrice: newTotalPrice
                    };
                }
                else {
                    return restaurant;
                }
            })
            await updateDoc(customerDocRef, {cart: [...newCart]});
            setCart(newCart);
        } catch(error) {
            console.log(error);
        }
    }

  return (
    <Modal open={open} onClose={onClose} style={{overflowY: 'auto'}}>
        {
            isLoading ? (
                <Grid container justifyContent="center" alignItems="center" rowGap={3} mt={20}>
                    <Grid item textAlign="center" xs={12}>
                        <CircularProgress />
                    </Grid>
                    <Grid item textAlign="center" xs={12}>
                        <Typography>Loading...</Typography>
                    </Grid>
                </Grid>
            ) : (
                <>
                    <GridModal 
                        style={{backgroundColor: 'white'}} 
                        container 
                        maxWidth="500px" 
                        maxHeight="auto"
                    > 
                        <Grid container alignItems="center" columnSpacing={1}>
                            <Grid item>
                                <Typography variant="h5">Your Cart</Typography>
                            </Grid>
                            <Grid item>
                                <ShoppingCartIcon fontSize='medium'/>
                            </Grid>
                        </Grid>
                        {
                            cart.length > 0 && cart.map((restaurant) => {
                                return (
                                    <Grid 
                                        container 
                                        key={restaurant.restaurantInfo.restaurantId}
                                        mt={2}
                                        mb={1}
                                    >
                                        <Grid item xs={12} mb={1}>
                                            <Typography variant="h6" fontWeight="bold">
                                                {restaurant.restaurantInfo.restaurantName}
                                            </Typography>
                                        </Grid>
                                        {
                                            restaurant.items && restaurant.items.map((item, index) => {
                                                return (
                                                    <Grid key={index} container alignItems="center" mb={2} columnSpacing={2}>
                                                        <Grid item xs={4}>
                                                            <NumberTextField
                                                                decrementQuantity={() => handleManipulateQuantity(item, restaurant.restaurantInfo.restaurantName, 'decrement')} 
                                                                incrementQuantity={() => handleManipulateQuantity(item, restaurant.restaurantInfo.restaurantName, 'increment')}
                                                                quantity={item.quantity} 
                                                                quantitySize="body1" 
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
                                                            {
                                                                item.options.length > 0 && item.options.map((option, index) => {
                                                                    return <Typography 
                                                                                key={index} 
                                                                                variant="body2" 
                                                                                color={grey[700]}
                                                                            >
                                                                                {option.name}, 
                                                                            </Typography>
                                                                })
                                                            }
                                                        </Grid>
                                                        <Grid item xs={2} textAlign="right">
                                                            <Typography 
                                                                variant="body1" 
                                                                fontWeight="bold"
                                                            >
                                                                ${formatToTwoDecimalPlace(item.totalPrice)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={2} textAlign="center">
                                                            <IconButton 
                                                                aria-label="delete" 
                                                                color="error"
                                                                onClick={() => handleDeleteItem(restaurant.restaurantInfo.restaurantName, item)}
                                                                size="large" 
                                                            >
                                                                <DeleteIcon fontSize="inherit" />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Divider />
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        <Grid container mb={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="body1" fontWeight="bold">Total</Typography>
                                            </Grid>
                                            <Grid item xs={4} textAlign="right" >
                                                <Typography variant="body1" fontWeight="bold">
                                                    ${formatToTwoDecimalPlace(restaurant.totalPrice)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                        <Grid 
                            container 
                            alignItems="center" 
                            rowGap={2}
                        >
                            <Grid item xs={12} md={6} textAlign="center">
                                <GoBackButton 
                                    variant="contained"
                                    onClick={() => navigate(`/customer/restaurant/${id}`)}
                                >
                                    Add more items
                                </GoBackButton>
                            </Grid>
                            <Grid item xs={12} md={6} textAlign="center">
                                <ToCheckoutButton 
                                    variant="contained"
                                    onClick={() => navigate('/customer/checkout')}
                                >
                                    Go to checkout
                                </ToCheckoutButton>
                            </Grid>
                        </Grid>
                    </GridModal>    
                </>
            )
        }  
    </Modal>
  )
}

ShowCartModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}