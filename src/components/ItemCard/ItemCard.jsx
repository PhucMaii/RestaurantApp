import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import {ButtonStyled, GridStyled} from './style'

export default function ItemCard({name, price}) {
  return (
    <GridStyled container padding={3} rowGap={3}>
        <Grid container>
            <Grid item xs={6}>
                <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography textAlign="right" variant="h6">${price}</Typography>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid container>
            <Grid item xs={6}>
                <ButtonStyled sx={{width: '90%'}} variant="contained">Edit</ButtonStyled>
            </Grid>
            <Grid item xs={6} textAlign="right">
                <ButtonStyled sx={{width: '90%'}} color="success" variant="contained">Available</ButtonStyled>
            </Grid>
        </Grid>
    </GridStyled>
  )
}
