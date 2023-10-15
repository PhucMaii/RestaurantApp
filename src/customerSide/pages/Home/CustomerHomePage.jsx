import { Grid, Typography } from '@mui/material';
import React from 'react'
import SearchBar from '../../components/SearchBar';
import FilterCarousel from '../../components/FilterCarousel/FilterCarousel';

export default function CustomerHomePage() {
  return (
    <Grid container>
      <Grid container>
        {/* sidebar */}
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          {/* showing address */}
          <Typography variant="h6">1805 Sixth Avenue</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" textAlign="right">Pick up</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <SearchBar />
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FilterCarousel />
        </Grid>
      </Grid>
      <Grid container>
        {/* List of restaurant cards */}
      </Grid>
    </Grid>
  )
}
