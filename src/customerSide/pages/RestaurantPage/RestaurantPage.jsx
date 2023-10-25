import React, { useState, useEffect } from 'react';
import { Alert, CircularProgress, Grid, Snackbar, Typography, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ButtonContainer, CoverImage, CoverImageGrid, FavoriteFab, GridContainer, SearchFab } from './styles';
import SectionDisplay from '../../components/SectionDisplay/SectionDisplay';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { CartButton } from '../Home/style';
import useLocalStorage from '../../../hooks/useLocalStorage';
import SearchItemsModal from '../../components/Modals/SearchItemsModal/SearchItemsModal';

export default function RestaurantPage() {
    const [filteredItemsList, setFilteredItemList] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
    const [notification, setNotification] = useState({
        on: false,
        type: 'success',
        msg: ''
    });
    const [menuData, setMenuData] = useState({});
    const [ratingData, setRatingData] = useState({});
    const [searchKeywords, setSearchKeywords] = useState('');
    const [restaurantData, setRestaurantData] = useState({});
    const [currCustomer, _setCurrCustomer] = useLocalStorage('current-customer', {});
    const { id } = useParams();
    const feedbackCollection = collection(db, 'feedback');
    const menuCollection = collection(db, 'menu');
    const feedbackQuery = query(feedbackCollection, where('restaurantId', '==', id));
    const menuQuery = query(menuCollection, where('restaurantRef', '==', `/users/${id}`));
    const customerDocRef = doc(db, 'customers', currCustomer.userId);
    const restaurantDocRef = doc(db, 'users', id);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        fetchCustomerInfo();
        fetchMenu();
        fetchRestaurant();
        fetchFeedback();
    }, [])

    const addToFavorite = async () => {
        try {
            const querySnapshot = await getDoc(customerDocRef);
            const data = querySnapshot.data(); 
            const favorites = data.favorties || [];
            favorites.push(id);
            setIsFavorite(true);
            await updateDoc(customerDocRef, {favorites});
            setNotification({
                on: true,
                type: 'success',
                msg: 'Added To Favorites'
            })
        } catch(error) {
            console.log(error);  
        }
    }

    const fetchFeedback = async () => {
        setIsLoading(true);
        try {
            let rating = 0;
            let numberOfRating = 0;
            const querySnapshot = await getDocs(feedbackQuery);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                rating += data.reviewStars;
                numberOfRating++;
            })
            setRatingData({rating: rating / numberOfRating || 5, numberOfRating});
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const fetchMenu = async () => {
        setIsLoading(true);
        try {
            const querySnapshot = await getDocs(menuQuery);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setMenuData(data);
            })
            setIsLoading(false)
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }
 
    const fetchRestaurant = async () => {
        setIsLoading(true);
        try {
            const querySnapshot = await getDoc(restaurantDocRef);
            const data = querySnapshot.data();
            setRestaurantData(prevData => {
                return {
                    ...prevData, 
                    address: data.restaurantAddress, 
                    image: data.imageLink , 
                    name: data.restaurantName, 
                    phoneNumber: data.restaurantPhoneNumber, 
                    type: data.restaurantType
                }
            })
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const fetchCustomerInfo = async () => {
        try {
            const querySnapshot = await getDoc(customerDocRef);
            const data = querySnapshot.data();
            if(data.favorites.includes(id)) {
                setIsFavorite(true);
            } else{
                setIsFavorite(false);
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleCloseSnackbar = () => {
        setNotification((prevNotification) => ({...prevNotification, on: false}))
    }

    const removeFromFavorite = async () => {
        try {
            const querySnapshot = await getDoc(customerDocRef);
            const data = querySnapshot.data();
            const favoriteArray = data.favorites || []; 
            const indexToRemove = favoriteArray.indexOf(id);
            favoriteArray.splice(indexToRemove, 1);
            setIsFavorite(false);
            await updateDoc(customerDocRef, {favorites: [...favoriteArray]});
            setNotification({
                on: true,
                type: 'success',
                msg: 'Removed From Favorites'
            });
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmitSearchBar = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            const keywords = searchKeywords.toLowerCase();
            const filteredList = menuData.sections.filter((section) => {
                if(section.items && section.items.length > 0) {
                    const items = section.items.filter((item) => {
                        return item.itemName.toLowerCase().includes(keywords);
                    })
                    return items.length > 0;
                }
            })
            setFilteredItemList(filteredList);
        }
    }

  return (
    <Grid container mt={2} rowGap={3}>
        {
            isLoading ? (
                <Grid container justifyContent="center" alignItems="center" rowGap={3}>
                    <Grid item textAlign="center" xs={12}>
                      <CircularProgress />
                    </Grid>
                    <Grid item textAlign="center" xs={12}>
                        <Typography>Loading...</Typography>
                    </Grid>
                </Grid>
            ) : (
                <>
                    <GridContainer container justifyContent="center" alignItems="center">
                        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={notification.on} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity={notification.type} sx={{ width: '100%' }}>
                              {notification.msg}
                            </Alert>
                        </Snackbar>
                        <SearchItemsModal 
                            filteredList={filteredItemsList}
                            handleSearch={handleSubmitSearchBar} 
                            open={isOpenSearchModal} 
                            onClose={() => setIsOpenSearchModal(false)} 
                            searchKeywords={searchKeywords}
                            setSearchKeywords={setSearchKeywords}
                        />
                        <Grid item xs={2}>
                            <Sidebar />
                        </Grid>
                        <Grid item xs={8} textAlign="center">
                            <Typography variant="h4" fontWeight="bold">Grab & Go</Typography>
                        </Grid>
                        <Grid item xs={2} textAlign="right">
                            <CartButton variant="contained" color="inherit">
                                <ShoppingCartIcon /> 0
                            </CartButton>
                        </Grid>
                    </GridContainer>
                    <CoverImageGrid item xs={12}>
                        <ButtonContainer $isSmallScreen={isSmallScreen} display="flex" alignItems="center" gap={1} marginTop={2}>
                            <SearchFab onClick={() => setIsOpenSearchModal(true)} size="medium"><SearchIcon fontSize="medium" /></SearchFab> 
                            <FavoriteFab size="medium">
                                {
                                    isFavorite ? 
                                        <FavoriteIcon onClick={removeFromFavorite} fontSize="medium" /> :
                                        <FavoriteBorderIcon onClick={addToFavorite} fontSize="medium" />
                                }
                            </FavoriteFab>
                        </ButtonContainer>
                        <CoverImage $isSmallScreen={isSmallScreen} src={restaurantData.image} />
                    </CoverImageGrid>
                    <GridContainer container>
                        <Grid item xs={12}>
                            <Typography variant="h4" fontWeight="bold">{restaurantData.name}</Typography>
                        </Grid>
                        <Grid container columnSpacing={1}>
                            <Grid item>
                                <FastfoodIcon fontSize="small" />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontWeight="bold">{restaurantData.type}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" columnSpacing={1}>
                            <Grid item>
                                <Typography variant="subtitle1" fontWeight="bold"><StarIcon fontSize='small' /></Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {ratingData.rating} {ratingData.numberOfRating > 0 ? `(${ratingData.numberOfRating} ratings)` : ''}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" columnSpacing={1}>
                            <Grid item>
                                <LocationOnIcon fontSize="small"/>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontWeight="bold">{restaurantData.address}</Typography>
                            </Grid>
                        </Grid>
                    </GridContainer>
                    <GridContainer container>
                        {
                            menuData.sections && menuData.sections.map((section, index) => {
                                return (
                                    <SectionDisplay key={index} sectionName={section.name} items={section.items} />
                                )
                            })
                        }
                    </GridContainer>
                </>
            )
        }
        
    </Grid>
  )
}
