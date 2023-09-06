import { Button, Grid, Modal, TextField } from '@mui/material'
import React, { memo } from 'react'
import { GridModal } from '../style';

function EditItemNameModal({ item, handleClose, open, setItem }) {
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
export default memo(EditItemNameModal)