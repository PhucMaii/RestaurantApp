import { 
    Button,
    Grid, 
    Typography, 
    Divider 
} from '@mui/material'
import React from 'react'
import BasicAccordion from '../../components/OrderDetails/OrderDetails'
export default function HomePage() {
  return (
    <Grid container >
        <Grid container rowGap={2} >
            <Grid container justifyContent="center">
                <Typography variant="h4">Preparing Time</Typography>
            </Grid>
            <Grid container justifyContent="center" columnGap={3}>
                <Button variant="contained" color="inherit">+</Button>
                <Typography variant="h6">12 mins</Typography>
                <Button variant="contained" color="inherit">-</Button>
            </Grid>
        </Grid>
        <Divider />
        <Grid container justifyContent="center">
            <BasicAccordion />
            <BasicAccordion />
            <BasicAccordion />
        </Grid>
    </Grid>
  )
}
