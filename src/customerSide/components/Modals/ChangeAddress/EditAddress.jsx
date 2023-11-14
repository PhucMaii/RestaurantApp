import { Button, Grid, Modal } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GridModal } from '../styles';
import GoogleMaps from '../../../../restaurantSide/components/GoogleMaps';

export default function EditAddress({ isOpen, onClose, changeAddress }) {
  const [customerAddress, setCustomerAddress] = useState({});

  const handleChangeAddress = (data) => {
    setCustomerAddress(data);
  };

  const handleSaveNewAddress = async () => {
    try {
      await changeAddress(customerAddress.description);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <GridModal
        maxWidth="500px"
        alignItems="center"
        columnSpacing={2}
        container
        padding={3}
        style={{backgroundColor: 'white'}}
      >
        <Grid item xs={8}>
          <GoogleMaps onDataReceived={handleChangeAddress} />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleSaveNewAddress} variant="contained">
            Save
          </Button>
        </Grid>
      </GridModal>
    </Modal>
  );
}

EditAddress.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
};
