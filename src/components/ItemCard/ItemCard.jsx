import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { formatToTwoDecimalPlace } from '../../method/FormatNumber';
import EditItemModal from '../Modals/EditItem/EditItemModal';
import {ButtonStyled, GridStyled} from './style'

export default function ItemCard({ deleteItem, item, setItem }) {
  const [isAvailable, setIsAvailable] = useState(item.availability);
  const [open, handleOpen] = useState(false);
  return (
    <>
      <EditItemModal
        deleteItem={deleteItem}
        item={item}
        open={open}
        handleClose={(e) => {
          handleOpen(false);
        }}
        setItem={setItem}
      />
      <GridStyled container padding={3} rowGap={3}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">{item.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography textAlign="right" variant="h6">
              ${formatToTwoDecimalPlace(item.price)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <ButtonStyled onClick={(e) => handleOpen(true)} variant="contained">
              Edit
            </ButtonStyled>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <ButtonStyled
              color={isAvailable ? "success" : "error"}
              onClick={() => setIsAvailable((prevAvailable) => !prevAvailable)}
              variant="contained"
            >
              {isAvailable ? "Available" : "Sold out"}
            </ButtonStyled>
          </Grid>
        </Grid>
      </GridStyled>
    </>
  );
}
