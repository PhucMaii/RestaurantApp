import { Typography, Grid } from '@mui/material'
import React from 'react'
import ItemCard from '../../components/ItemCard/ItemCard'
import ResponsiveDrawer from '../../components/Sidebar/Sidebar'
import EditItemModal from '../../components/Modals/EditItemModal'

export default function MenuPage() {
    const menu = (
        <Grid container columnSpacing={2} justifyContent="center">
            <Grid item xs={6}>
                <ItemCard name="Noodle Soup" price={15.50} />
            </Grid>
            <Grid item xs={6}>
                <ItemCard name="Make your own" price={20} />
            </Grid>
        </Grid>
    )
  return <ResponsiveDrawer tab={menu}/>
}
