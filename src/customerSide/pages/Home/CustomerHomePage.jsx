import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterCarousel from '../../components/FilterCarousel/FilterCarousel';
import { CartButton, ThickDivider } from './style';
import Card from '../../components/RestaurantCard/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from '../../components/Sidebar';
import ChangeAddressModal from '../../components/Modals/ChangeAddressModal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase.config';

export default function CustomerHomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const restaurantCollection = collection(db, 'users');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const restaurantSnap = await getDocs(restaurantCollection);
      const restaurantData = [];
      restaurantSnap.forEach((doc) => {
        restaurantData.push(doc.data());
      });
      setRestaurantList(restaurantData);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  return (
    <Grid container rowGap={3}>
      {isLoading ? (
        <Grid container justifyContent="center" alignItems="center" rowGap={3}>
          <Grid item textAlign="center" xs={12}>
            <CircularProgress />
          </Grid>
          <Grid item textAlign="center" xs={12}>
            <Typography variant="h4">Loading...</Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container mt={1} alignItems="center">
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={8} textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                Grab & Go
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <CartButton variant="contained" color="inherit">
                <ShoppingCartIcon /> 0
              </CartButton>
              <Typography></Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" mr={2}>
            <Grid item xs={6}>
              <ChangeAddressModal isOpen={true} />
            </Grid>
            <Grid item xs={6}>
              <Typography textAlign="right">Pick up</Typography>
            </Grid>
          </Grid>
          <Grid container ml={2} mr={2}>
            <SearchBar />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FilterCarousel />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <ThickDivider />
            </Grid>
          </Grid>
          <Grid container>
            {restaurantList.map((restaurant) => {
              return (
                <Card
                  key={restaurant.docId}
                  image={restaurant.imageLink}
                  name={restaurant.restaurantName}
                  prepTime={restaurant.preparingTime}
                  // find rating by calculate the average in feedback collection
                />
              );
            })}
          </Grid>
        </>
      )}
    </Grid>
  );
}
