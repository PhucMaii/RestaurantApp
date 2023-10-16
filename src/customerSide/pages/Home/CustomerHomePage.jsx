import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterCarousel from '../../components/FilterCarousel/FilterCarousel';
import { CartButton, ThickDivider } from './style';
import Card from '../../components/RestaurantCard/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from '../../components/Sidebar';
import ChangeAddressModal from '../../components/Modals/ChangeAddress/ChangeAddressModal';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import useLocalStorage from '../../../hooks/useLocalStorage';

export default function CustomerHomePage() {
  const [customerAddress, setCustomerAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [tempRestaurantList, setTempRestaurantList] = useState([]);
  const [currCustomer, _setCurrCustomer] = useLocalStorage(
    'current-customer',
    {},
  );
  const [searchKeywords, setSearchKeywords] = useState('');
  const restaurantCollection = collection(db, 'users');
  const customerCollection = collection(db, 'customers');
  const feedbackCollection = collection(db, 'feedback');
  const historyCollection = collection(db, 'history');
  const customerId = currCustomer.userId;
  const userRef = doc(customerCollection, customerId);

  useEffect(() => {
    fetchCustomerInfo();
    fetchRestaurants();
  }, []);

  useEffect(() => {
    setRestaurantList(() => {
      return tempRestaurantList;
    });
    const search = searchKeywords.toLowerCase();
    const filteredList = tempRestaurantList.filter((restaurant) => {
      const restaurantName = restaurant.restaurantName.toLowerCase();
      return restaurantName.includes(search);
    });
    setRestaurantList(filteredList);
  }, [searchKeywords]);

  const changeAddress = async (newAddress) => {
    try {
      await updateDoc(userRef, { address: newAddress });
      setCustomerAddress(newAddress);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCustomerInfo = async () => {
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setCustomerAddress(data.address);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const restaurantSnap = await getDocs(restaurantCollection);
      const restaurantPromise = restaurantSnap.docs.map(async (doc) => {
        let rating = 0;
        let numberOfRating = 0;
        const data = doc.data();
        const id = doc.id;
        const queryFeedback = query(
          feedbackCollection,
          where('restaurantId', '==', id),
        );
        const querySnapshot = await getDocs(queryFeedback);
        querySnapshot.forEach((feedbackDoc) => {
          const feedbackData = feedbackDoc.data();
          rating += feedbackData.reviewStars;
          numberOfRating++;
        });
        return { ...data, rating: rating / numberOfRating || 5 };
      });
      const restaurantData = await Promise.all(restaurantPromise); // Wait for all asynchronous function ended
      setRestaurantList(restaurantData);
      setTempRestaurantList(restaurantData);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const filterRestaurantByType = async (type) => {
    setIsLoading(true);
    try {
      const filterList = [];
      const restaurantQuery = query(
        restaurantCollection,
        where('restaurantType', '==', type),
      );
      const querySnapshot = await getDocs(restaurantQuery);
      querySnapshot.forEach((doc) => {
        const restaurantData = doc.data();
        filterList.push(restaurantData);
      });
      setRestaurantList(filterList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const filterRestaurantByRating = () => {
    const newRestaurantList = [...restaurantList];
    newRestaurantList.sort((restaurantA, restaurantB) => {
      return restaurantB.rating - restaurantA.rating;
    });
    setRestaurantList(newRestaurantList);
  };

  const filterRestaurantByPopular = async () => {
    try {
      const updatedRestaurantList = await Promise.all(
        restaurantList.map(async (restaurant) => {
          let numberOfOrders = 0;
          const queryHistoryOrder = query(
            historyCollection,
            where('restaurantId', '==', restaurant.docId),
          );
          const querySnapshot = await getDocs(queryHistoryOrder);
          querySnapshot.forEach(() => {
            numberOfOrders++;
          });
          return { ...restaurant, popularity: numberOfOrders };
        }),
      );
      const newRestaurantList = [...updatedRestaurantList];
      newRestaurantList.sort((restaurantA, restaurantB) => {
        return restaurantB.popularity - restaurantA.popularity;
      });
      setRestaurantList(newRestaurantList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container rowGap={3}>
      {isLoading ? (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowGap={3}
          mt={10}
        >
          <Grid item xs={12} textAlign="center">
            <CircularProgress />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">You are being directed...</Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container mt={1} alignItems="center" mr={2}>
            <Grid item xs={2}>
              <Sidebar
                customerName={currCustomer.userName}
                filterByRating={filterRestaurantByRating}
                filterByPopular={filterRestaurantByPopular}
              />
            </Grid>
            <Grid item xs={8} textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                Grab & Go
              </Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <CartButton variant="contained" color="inherit">
                <ShoppingCartIcon /> 0
              </CartButton>
            </Grid>
          </Grid>
          <Grid container alignItems="center" mr={2}>
            <Grid item xs={6}>
              <ChangeAddressModal
                isOpen={true}
                address={customerAddress}
                changeAddress={changeAddress}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography textAlign="right">Pick up</Typography>
            </Grid>
          </Grid>
          <Grid container ml={2} mr={2}>
            <SearchBar setSearchKeywords={setSearchKeywords} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FilterCarousel filterByType={filterRestaurantByType} resetFilter={fetchRestaurants} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <ThickDivider />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3} pl={3} pr={3}>
            {restaurantList.map((restaurant) => {
              return (
                restaurant.isOpen && (
                  <Card
                    key={restaurant.docId}
                    image={restaurant.imageLink}
                    name={restaurant.restaurantName}
                    prepTime={restaurant.preparingTime}
                    rating={restaurant.rating || 5}
                  />
                )
              );
            })}
          </Grid>
        </>
      )}
    </Grid>
  );
}