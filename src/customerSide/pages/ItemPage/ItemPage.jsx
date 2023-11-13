import React, { useEffect, useState } from 'react';
import { 
    Checkbox, 
    CircularProgress, 
    Divider,  
    Grid,  
    Typography, 
    useMediaQuery
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { 
    AddButton,
    AddButtonContainerStyled, 
    CancelButtonContainerStyled, 
    DividerStyled, 
    ImageStyled,
    LargeScreenAddButtonContainerStyled
} from './styles';
import NumberTextField from '../../components/NumberTextField/NumberTextField';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    updateDoc, 
    where 
} from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { calculateTotalInObject, formatToTwoDecimalPlace } from '../../../utils/number';
import useLocalStorage from '../../../hooks/useLocalStorage';
import ShowCartModal from '../../components/Modals/ShowCartModal/ShowCartModal';
import { findIndex, isEqual } from 'lodash';

export default function ItemPage() {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [itemInfo, setItemInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [options, setOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [restaurantData, setRestaurantData] = useState({});
    const [curUser, _setCurUser] = useLocalStorage('current-customer', {});
    const navigate = useNavigate();
    const { id, itemName, sectionName } = useParams();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const menuCollection = collection(db, 'menu');
    const restaurantCollection = collection(db, 'users');
    const userCollection = collection(db, 'customers');
    const menuQuery = query(menuCollection, where('restaurantRef', '==', `/users/${id}`));
    const userRef = doc(userCollection, curUser.userId);
    const restaurantRef = doc(restaurantCollection, id);

    useEffect(() => {
        fetchRestaurant();
        fetchMenu();
    }, [])

    const addItemToCart = async () => {
        setIsLoading(true);
        try {
            const userDoc = await getDoc(userRef);
            const data = userDoc.data();
            let cartData = data.cart || [];
            const optionPrice = calculateTotalInObject(options, 'price');
            const submitData = {
                items: [
                    {
                        name: itemInfo.itemName,
                        price: itemInfo.itemPrice + optionPrice,
                        quantity,
                        totalPrice,
                        options
                    }
                ],
                totalPrice,
                restaurantInfo: {
                    restaurantName: restaurantData.restaurantName,
                    restaurantId: id
                },
            }
            if(cartData.length > 0) {
                const hasRestaurant = cartData.some((restaurant) => restaurant.restaurantInfo.restaurantId === id);
                if(hasRestaurant) {
                    cartData = cartData.map((restaurant) => {
                        if(restaurant.restaurantInfo.restaurantId === id) {
                            // find if there is any same item exists already in cart
                            const targetIndex = findIndex(restaurant.items, function(item) {
                                return item.name === itemInfo.itemName &&
                                        item.price === itemInfo.itemPrice &&
                                        isEqual(item.options, options);
                            })
                            // if yes, just need to update quantity and totalPrice value of that item
                            if(targetIndex > -1) {
                                restaurant.items[targetIndex] = {
                                    ...restaurant.items[targetIndex],
                                    quantity: restaurant.items[targetIndex].quantity + 1,
                                    totalPrice: restaurant.items[targetIndex].totalPrice + restaurant.items[targetIndex].price  
                                }
                                return {
                                    ...restaurant,
                                    totalPrice: restaurant.totalPrice + restaurant.items[targetIndex].price
                                };
                            }

                            return {
                                ...restaurant,
                                items: [
                                    ...restaurant.items,
                                    {
                                        name: itemInfo.itemName,
                                        price: itemInfo.itemPrice + optionPrice,
                                        quantity,
                                        totalPrice,
                                        options
                                    }
                                ],
                                totalPrice: restaurant.totalPrice + totalPrice,
                            }
                        } else {
                            return restaurant;
                        }
                    })
                } else {
                    cartData.push(submitData);
                }
            } else {
                cartData.push(submitData);
            }
            await updateDoc(userRef, {cart: [...cartData]});
            setTotalPrice(itemInfo.itemPrice);
            setQuantity(1);
            setOptions([]);
            setIsCartModalOpen(true);
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const addOption = (e, option) => {
        if(e.target.checked) {
            const newOption = [...options, option ];
            const optionPrice = calculateTotalInObject(newOption, 'price');
            setTotalPrice((itemInfo.itemPrice + optionPrice) * quantity);
            setOptions(newOption);
        } else {
            const newOption = options.filter((curOption) => {
                return curOption.name !== option.name
            });
            const optionPrice = calculateTotalInObject(newOption, 'price');
            setTotalPrice((itemInfo.itemPrice + optionPrice) * quantity);
            setOptions(newOption);
        }
    }
    
    const decrementQuantity = () => {
        if(quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            const optionPrice = calculateTotalInObject(options, 'price');
            setTotalPrice((itemInfo.itemPrice + optionPrice) * newQuantity);
        }
    }

    const fetchMenu = async () => {
        setIsLoading(true);
        try {
            let data;
            const querySnapshot = await getDocs(menuQuery);
            querySnapshot.forEach((doc) => {
                data = doc.data();
            })
            const section = data.sections.find((section) => section.name === sectionName);
            const item = section.items.find((item) => item.itemName === itemName);
            setItemInfo(item);
            setTotalPrice(item.itemPrice);
            setIsLoading(false)
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const fetchRestaurant = async () => {
        setIsLoading(true);
        try {
            const restaurantDoc = await getDoc(restaurantRef);
            const data = restaurantDoc.data();
            setRestaurantData(data);
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        const optionPrice = calculateTotalInObject(options, 'price');
        setTotalPrice((itemInfo.itemPrice + optionPrice) * newQuantity);
    }

    return (
        <>
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
                    <Grid 
                        container 
                        p={isSmallScreen ? 0 : 5}
                        pb={isSmallScreen && 12} 
                        columnSpacing={!isSmallScreen ? 5 : 0}    
                    >
                        <ShowCartModal 
                            open={isCartModalOpen}
                            onClose={() => setIsCartModalOpen(false)}
                        />
                        <CancelButtonContainerStyled 
                            item xs={12} 
                            textAlign="left"
                            onClick={() => navigate(`/customer/restaurant/${id}`)}
                        >
                            <CancelIcon fontSize="large" />
                        </CancelButtonContainerStyled>
                        <Grid 
                            item 
                            maxHeight={isSmallScreen ? 250 : 'auto'} 
                            md={6} 
                            mt={!isSmallScreen && 3}
                            xs={12} 
                        >
                            <ImageStyled 
                                $isSmallScreen={isSmallScreen}
                                src={itemInfo.itemImageURL ? itemInfo.itemImageURL : '/image/imageDoesNotExist.png'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container m={1} rowGap={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" fontWeight="bold">{itemInfo.itemName}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" fontWeight="bold">${formatToTwoDecimalPlace(itemInfo.itemPrice)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">{itemInfo.itemDescription}</Typography>
                                </Grid>
                            </Grid> 
                            <Grid container mt={2}>
                                <Grid item xs={12}>
                                    <DividerStyled />
                                </Grid>
                            </Grid>
                            <Grid container mt={2}>
                                <Grid container ml={1}>
                                    <Typography variant="h6" fontWeight="bold">Pick options</Typography>
                                </Grid>
                                {
                                    itemInfo.options && itemInfo.options.map((option, index) => {
                                        return (
                                            <Grid key={index} container margin={1} alignItems="center">
                                                <Grid item textAlign="left" xs={6}>
                                                    <Typography>
                                                        {option.name} - ${formatToTwoDecimalPlace(option.price)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item textAlign="right" xs={6}>
                                                    <Checkbox onChange={(e) => addOption(e, option)} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid container mt={2}>
                                <Grid item xs={12}>
                                    <DividerStyled />
                                </Grid>
                            </Grid>
                            <Grid container mt={2} ml={1} rowGap={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" fontWeight="bold">Quantity</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <NumberTextField 
                                        decrementQuantity={decrementQuantity}
                                        incrementQuantity={incrementQuantity} 
                                        quantity={quantity}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container mt={3}>
                                <LargeScreenAddButtonContainerStyled item xs={12}>
                                    <AddButton 
                                        fullWidth 
                                        onClick={addItemToCart} 
                                        variant="contained"
                                    >
                                        <Typography variant="subtitle1">
                                            Add {quantity} to cart - ${formatToTwoDecimalPlace(totalPrice)}
                                        </Typography>
                                    </AddButton>
                                </LargeScreenAddButtonContainerStyled>
                            </Grid>
                        </Grid>
                        <AddButtonContainerStyled item xs={12}>
                            <AddButton
                                fullWidth 
                                onClick={addItemToCart} 
                                variant="contained"
                            >
                                <Typography variant="subtitle1">
                                    Add {quantity} to cart - ${formatToTwoDecimalPlace(totalPrice)}
                                </Typography>
                            </AddButton>
                        </AddButtonContainerStyled>
                    </Grid>
                )
            }

        </>
    )
}
