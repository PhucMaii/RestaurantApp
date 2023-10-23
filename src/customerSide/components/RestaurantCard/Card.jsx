import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { MainContainer, RatingContainer, RestaurantImage } from './styles';
import { useNavigate } from 'react-router-dom';

export default function Card({ restaurant }) {
  const navigate = useNavigate();

  const navigateToRestaurantPage = () => {
    navigate(`/customer/restaurant/${restaurant.docId}`);
  };

  return (
    <MainContainer
      onClick={navigateToRestaurantPage}
      item
      xs={12}
      md={3}
      xl={2}
    >
      <Grid item>
        <RestaurantImage src={restaurant.imageLink} alt="img" />
      </Grid>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h6" fontWeight="bold">
            {restaurant.restaurantName}
          </Typography>
        </Grid>
        <RatingContainer item xs={2} textAlign="center">
          <Typography>
            {restaurant.rating ? restaurant.rating.toFixed(1) : 'Unrated'}
          </Typography>
        </RatingContainer>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          Preparing Time: appx. {restaurant.preparingTime / 60} min
        </Typography>
      </Grid>
    </MainContainer>
  );
}

Card.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
