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
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { calculateTotalInObject, formatToTwoDecimalPlace } from '../../../utils/number';
import useLocalStorage from '../../../hooks/useLocalStorage';
import ShowCartModal from '../../components/Modals/ShowCartModal/ShowCartModal';

export default function ItemPage() {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [itemInfo, setItemInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [options, setOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [curUser, _setCurUser] = useLocalStorage('current-customer', {});
    const { id, itemName, sectionName } = useParams();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const menuCollection = collection(db, 'menu');
    const menuQuery = query(menuCollection, where('restaurantRef', '==', `/users/${id}`));
    const userCollection = collection(db, 'customers');
    const userRef = doc(userCollection, curUser.userId);

    useEffect(() => {
        fetchMenu();
    }, [])

    const addItemToCart = async () => {
        setIsLoading(true);
        try {
            const userDoc = await getDoc(userRef);
            const data = userDoc.data();
            let cartData = data.cart;
            const hasRestaurant = cartData.some((restaurant) => restaurant.restaurantId === id);
            if(hasRestaurant) {
                cartData = cartData.map((restaurant) => {
                    if(restaurant.restaurantId === id) {
                        const optionPrice = calculateTotalInObject(options, 'price');
                        return {
                            ...restaurant,
                            totalPrice: restaurant.totalPrice + totalPrice,
                            items: [
                                ...restaurant.items,
                                {
                                    name: itemInfo.itemName,
                                    price: itemInfo.itemPrice + optionPrice,
                                    quantity,
                                    totalPrice
                                }
                            ]
                        }
                    } else {
                        return restaurant;
                    }
                })
            } else {
                const optionPrice = calculateTotalInObject(options, 'price');
                cartData.push({
                    restaurantId: id,
                    totalPrice,
                    items: [
                        {
                            name: itemInfo.itemName,
                            price: itemInfo.price + optionPrice,
                            quantity,
                            totalPrice
                        }
                    ]
                })
            }
            await updateDoc(userRef, {cart: [...cartData]});
            setTotalPrice(itemInfo.itemPrice);
            setQuantity(1);
            setOptions([]);
            setIsLoading(false);
            setIsCartModalOpen(true);
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
            setQuantity((prevQuantity) => prevQuantity - 1);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - itemInfo.itemPrice);
        }
    }

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + itemInfo.itemPrice);
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
                        open={true} 
                        container 
                        p={isSmallScreen ? 0 : 5}
                        pb={isSmallScreen && 12} 
                        columnSpacing={!isSmallScreen && 5}    
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
                                src={itemInfo.itemImageURL || '/image/imageDoesNotExist.png'}
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
