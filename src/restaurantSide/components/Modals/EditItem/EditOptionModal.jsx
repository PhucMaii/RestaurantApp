import { Button, TextField, Modal, Grid } from '@mui/material';
import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { nonNumericCharacter } from '../../../utils/constant';
import { GridModal } from '../style';
import { ThemeContext } from '../../../Provider/ThemeContext';

function EditOptionModal({ handleClose, open, option, setOption }) {
  const {isDarkTheme} = useContext(ThemeContext);
  
  const handlePriceChange = (e) => {
    // Remove non-numeric character
    const numericValue = e.target.value.replace(nonNumericCharacter, "");
    setOption(option, "price", +numericValue);
  };
  return (
    <Modal onClose={handleClose} open={open}>
      <GridModal
        maxWidth="500px"
        alignItems="center"
        container
        padding={2}
        rowGap={2}
        $isDarkTheme={isDarkTheme}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Update Option Name"
            placeholder="Enter Option Name..."
            onChange={(e) => setOption(option, "name", e.target.value)}
            value={option.name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Update Option Price"
            placeholder="Enter Option Price..."
            onChange={handlePriceChange}
            value={option.price}
            variant="filled"
          />
        </Grid>
        <Grid container justifyContent="right">
          <Grid item>
            <Button onClick={handleClose} color="primary" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </GridModal>
    </Modal>
  );
}

EditOptionModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired, 
  option: PropTypes.object.isRequired,
  setOption: PropTypes.func.isRequired
}

export default memo(EditOptionModal)