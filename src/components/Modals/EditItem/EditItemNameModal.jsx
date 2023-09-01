import { Button, Grid, Modal, TextField } from '@mui/material'
import React from 'react'

export default function EditItemNameModal({ item, handleClose, open, setItem }) {
  const handleChangeName = (e) => {
    setItem(item, "itemName", e.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        alignItems="center"
        columnSpacing={2}
        container
        padding={3}
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
      </Grid>
    </Modal>
  );
}
