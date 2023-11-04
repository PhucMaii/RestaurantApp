import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { ItemImage } from './styles';

export default function ItemCard({image, name, price}) {
  return (
    <Grid container>
        <Grid item xs={12}>
            <ItemImage src={image} />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle1" >${price}</Typography>
        </Grid>
    </Grid>
  )
}

ItemCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}