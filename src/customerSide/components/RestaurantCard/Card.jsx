import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { grey } from '@mui/material/colors';
import React from 'react';
import { MainContainer, RestaurantImage } from './styles';

export default function Card({
    image,
    name,
    prepTime,
}) {
  return (
    <MainContainer container>
        <Grid item>
            <RestaurantImage src={image} style={{width: '100%'}} alt="img" />
        </Grid>
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h6" fontWeight="bold">{name}</Typography>
            </Grid>
            <Grid item xs={2} textAlign='center' style={{backgroundColor: grey[200], borderRadius: '20px', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Typography>5.0</Typography>
            </Grid>
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
}
