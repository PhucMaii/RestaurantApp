import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function ItemCard({ item, section }) {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const navigateToItemPage = () => {
        navigate(`/customer/restaurant/${id}/${section.name}/${item.itemName}`)
    }

    return (
        <Grid container onClick={navigateToItemPage}>
            <Grid item xs={4}>
                <img src={item.itemImageURL || '../../../../../image/imageDoesNotExist.png'} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={8}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6" fontWeight="bold">{item.itemName}</Typography>
                    <Typography variant="subtitle2">{item.itemDescription}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    section: PropTypes.object.isRequired
}
