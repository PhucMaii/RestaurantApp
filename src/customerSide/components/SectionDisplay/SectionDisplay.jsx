import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import ItemCard from '../ItemCard/ItemCard';

export default function SectionDisplay({items, sectionName}) {
  return (
    <Grid container p={2} rowGap={2}>
        <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold">{sectionName}</Typography>
        </Grid>
        <Grid container spacing={3}>
            {
                items ? (items.map((item, index) => {
                    return (
                        <Grid item key={index} xs={6}>
                            <ItemCard 
                                image={item.itemImageURL ? item.itemImageURL : '../../image/imageDoesNotExist.png'} 
                                name={item.itemName}
                                price={item.itemPrice}
                            />
                        </Grid>
                    )
                })) : (
                    <Grid item>
                        <Typography variant="h6" fontWeight="bold">Coming soon...</Typography>
                    </Grid>
                )
            }
        </Grid>
    </Grid>
  )
}

SectionDisplay.propTypes = {
    items: PropTypes.array.isRequired,
    sectionName: PropTypes.string.isRequired,
}