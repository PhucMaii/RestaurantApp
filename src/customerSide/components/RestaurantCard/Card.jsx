import { Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { MainContainer, RestaurantImage } from './styles'

export default function Card() {
  return (
    <MainContainer container>
        <Grid item>
            <RestaurantImage src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" style={{width: '100%'}} alt="img" />
        </Grid>
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h6" fontWeight="bold">Paradise Donair</Typography>
            </Grid>
            <Grid item xs={2} textAlign='center' style={{backgroundColor: grey[200], borderRadius: '20px', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Typography>5.0</Typography>
            </Grid>
        </Grid>
        <Grid item>
            <Typography variant="subtitle1">Preparing Time: appx. 10 min</Typography>
        </Grid>
    </MainContainer>
  )
}
