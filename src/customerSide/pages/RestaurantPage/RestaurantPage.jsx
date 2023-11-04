import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { ButtonContainer, CoverImage, CoverImageGrid, FavoriteFab, SearchFab } from './styles';
import SectionDisplay from '../../components/SectionDisplay/SectionDisplay';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { useParams } from 'react-router-dom';

export default function RestaurantPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [menuData, setMenuData] = useState({});
    const [ratingData, setRatingData] = useState({});
    const [restaurantData, setRestaurantData] = useState({});
    const { id } = useParams();
    const feedbackCollection = collection(db, 'feedback');
    const menuCollection = collection(db, 'menu');
    const feedbackQuery = query(feedbackCollection, where('restaurantId', '==', id));
    const menuQuery = query(menuCollection, where('restaurantRef', '==', `/users/${id}`));
    const restaurantDocRef = doc(db, 'users', id);

    useEffect(() => {
        fetchMenu();
        fetchRestaurant();
        fetchFeedback();
    }, [])

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

    console.log(restaurantData)
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
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={2}>
                            {/* Sidebar */}
                        </Grid>
                        <Grid item xs={8} textAlign="center">
                            <Typography variant="h4" fontWeight="bold">Grab & Go</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            {/* Cart */}
                        </Grid>
                    </Grid>
                    <CoverImageGrid item xs={12}>
                        <ButtonContainer display="flex" gap={1} marginTop={2}>
                            <SearchFab size="small"><SearchIcon fontSize='small' /></SearchFab>
                            <FavoriteFab size="small"><FavoriteBorderIcon fontSize="small" /></FavoriteFab>
                        </ButtonContainer>
                        <CoverImage src={restaurantData.image} />
                    </CoverImageGrid>
                    <Grid container pl={2}>
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
                    </Grid>
                    <Grid container>
                        {
                            menuData.sections && menuData.sections.map((section, index) => {
                                return (
                                    <SectionDisplay key={index} sectionName={section.name} items={section.items} />
                                )
                            })
                        }
                    </Grid>
                </>
            )
        }
        
    </Grid>
  )
}
