import { Button, Grid, Modal, TextField } from '@mui/material'
import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { GridModal } from '../style';
import { ThemeContext } from '../../../../Provider/ThemeContext';

function EditItemNameModal({ item, handleClose, open, setItem }) {
  const {isDarkTheme} = useContext(ThemeContext);
  
  const handleChangeName = (e) => {
    setItem(item, "itemName", e.target.value, true);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <GridModal
        maxWidth="500px"
        alignItems="center"
        columnSpacing={2}
        container
        padding={3}
        $isDarkTheme={isDarkTheme}
      >
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Enter New Item's Name"
            placeholder="Enter Name..."
            onChange={handleChangeName}
            value={item.name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleClose} variant="contained">
            Save
          </Button>
        </Grid>
      </GridModal>
    </Modal>
  );
}

EditItemNameModal.propTypes = {
  item: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setItem: PropTypes.func.isRequired,
}

export default memo(EditItemNameModal)