import { Divider, Grid, Typography } from '@mui/material'
import React, { memo, useCallback } from 'react'
import { useState, useEffect } from 'react';
import { formatToTwoDecimalPlace } from '../../utils/utils';
import EditItemModal from '../Modals/EditItem/EditItemModal';
import PropTypes from 'prop-types';
import {ButtonStyled, GridStyled} from './style'

function ItemCard({ deleteItem, item, saveChanges, setItem }) {
  const [isAvailable, setIsAvailable] = useState(item.availability);
  const [open, handleOpen] = useState(false);
  const toggleItemAvailability = () => {
    setItem(item, "availability", isAvailable, false)
  }
  const handleCloseEditItemModal = useCallback(() => {
    handleOpen(false);
  }, [])
  useEffect(() => {
    toggleItemAvailability();
  }, [isAvailable])
  return (
    <>
      <EditItemModal
        deleteItem={deleteItem}
        item={item}
        open={open}
        handleClose={handleCloseEditItemModal}
        saveChanges={saveChanges}
        setItem={setItem}
      />
      <GridStyled container padding={3} rowGap={3}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">{item.itemName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography textAlign="right" variant="h6">
              ${formatToTwoDecimalPlace(item.itemPrice)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <ButtonStyled onClick={() => handleOpen(true)} variant="contained">
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

ItemCard.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  saveChanges: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
}

export default memo(ItemCard)