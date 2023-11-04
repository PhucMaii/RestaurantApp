import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import ItemCard from '../ItemCard/ItemCard';

export default function SectionDisplay({items, sectionName}) {
  return (
    <Grid container pb={2} rowGap={2}>
        <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold">{sectionName}</Typography>
        </Grid>
        <Grid container spacing={3}>
            {
                items ? (items.map((item, index) => {
                    return (
                        item.availability && <Grid item key={index} xs={6} md={4} lg={3} xl={2}>
                            <ItemCard 
                                image={
                                    item.itemImageURL ? 
                                        item.itemImageURL : 
                                        '../../image/imageDoesNotExist.png'
                                } 
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
    items: PropTypes.array,
    sectionName: PropTypes.string.isRequired,
}