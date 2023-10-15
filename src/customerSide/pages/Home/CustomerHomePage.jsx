import { Button, Grid, Typography } from '@mui/material';
import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterCarousel from '../../components/FilterCarousel/FilterCarousel';
import { CartButton, ThickDivider } from './style';
import Card from '../../components/RestaurantCard/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from '../../components/Modals/Sidebar/Sidebar';

export default function CustomerHomePage() {
  return (
    <Grid container rowGap={3}>
      <Grid container mt={1} alignItems="center">
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={8} textAlign="center">
          <Typography variant="h5" fontWeight="bold">Pick & Go</Typography>
        </Grid>
        <Grid item xs={2}>
          <CartButton variant="contained" color="inherit"><ShoppingCartIcon /> 0</CartButton>
          <Typography></Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" mr={2}>
        <Grid item xs={6}>
          <Button><Typography>1805 Sixth Avenue</Typography></Button>
        </Grid>
        <Grid item xs={6}>
          <Typography textAlign="right">Pick up</Typography>
        </Grid>
      </Grid>
      <Grid container ml={2} mr={2}>
        <SearchBar />
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FilterCarousel />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <ThickDivider/>
        </Grid>
      </Grid>
      <Grid container>
        <Card />
        {/* List of restaurant cards */}
      </Grid>
    </Grid>
  )
}
