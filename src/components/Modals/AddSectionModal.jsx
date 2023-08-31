import { Button, Grid, Modal, TextField } from '@mui/material'
import React from 'react'

export default function AddSectionModal({
  addSection,
  sectionName,
  handleClose,
  open,
  setSectionName,
}) {
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
            label="Enter New Section's Name"
            placeholder="Enter Name..."
            onChange={(e) => setSectionName(e.target.value)}
            value={sectionName}
            variant="filled"
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={() => {
            addSection(sectionName);
            handleClose();
          }} variant="contained">
            Add
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
