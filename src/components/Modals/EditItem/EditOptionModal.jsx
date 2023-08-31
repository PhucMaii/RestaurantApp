import { Button, TextField, Modal, Grid } from '@mui/material';
import React from 'react'
import { formatToTwoDecimalPlace } from '../../../method/FormatNumber';
import { nonNumericCharacter } from '../../../utils/constant';

export default function EditOptionModal({ handleClose, open, option, setOption }) {
  const handlePriceChange = (e) => {
    // Remove non-numeric character
    const numericValue = e.target.value.replace(nonNumericCharacter, "");
    setOption(option, "price", numericValue);
  };
  return (
    <Modal onClose={handleClose} open={open}>
      <Grid
        alignItems="center"
        container
        padding={2}
        rowGap={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "500px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
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
      </Grid>
    </Modal>
  );
}
