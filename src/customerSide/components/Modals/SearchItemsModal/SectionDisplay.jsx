import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import ItemCard from './ItemCard';

export default function SectionDisplay({ section }) {
  return (
    <Grid container mt={3}>
        <Grid item>
            <Typography variant="h5" fontWeight="bold">{section.name}</Typography>
        </Grid>
        <Grid container mt={2}>
            {
                section.items && section.items.map((item, index) => {
                    return item.availability && <ItemCard key={index} section={section} item={item} />
                })
            }
        </Grid>

    </Grid>
  )
}

SectionDisplay.propTypes = {
    section: PropTypes.object.isRequired
}