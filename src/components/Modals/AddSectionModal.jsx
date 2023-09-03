import { Button, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import { GridModal } from './style';

export default function AddSectionModal({
  addSection,
  sectionName,
  handleClose,
  open,
  setSectionName,
}) {
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
      </GridModal>
    </Modal>
  );
}
