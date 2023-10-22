import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { MainContainer, RatingContainer, RestaurantImage } from './styles';

export default function Card({
    image,
    name,
    prepTime,
    rating
}) {
  return (
    <MainContainer item xs={12} md={3} xl={2}>
        <Grid item>
            <RestaurantImage src={image} alt="img" />
        </Grid>
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h6" fontWeight="bold">{name}</Typography>
            </Grid>
            <RatingContainer item xs={2} textAlign='center'>
                <Typography>{rating ? rating.toFixed(1) : 'Unrated'}</Typography>
            </RatingContainer>
        </Grid>
        <Grid item>
            <Typography variant="subtitle1">Preparing Time: appx. {prepTime / 60} min</Typography>
        </Grid>
    </MainContainer>
  )
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    prepTime: PropTypes.number.isRequired,
    rating: PropTypes.number

}
