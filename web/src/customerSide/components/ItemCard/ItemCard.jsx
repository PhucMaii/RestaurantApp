import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { ItemImage } from './styles';
import { useNavigate, useParams } from 'react-router-dom';

export default function ItemCard({image, name, price, sectionName}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const navigateToItemPage = () => {
        navigate(`/customer/restaurant/${id}/${sectionName}/${name}`)
    }

    return (
        <Grid container onClick={navigateToItemPage}>
            <Grid item xs={12}>
                <ItemImage src={image} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" >${price.toFixed(2)}</Typography>
            </Grid>
        </Grid>
    )
}

ItemCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sectionName: PropTypes.string.isRequired
}