import { Button, Grid, Modal, TextField } from '@mui/material'
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { GridModal } from './style';

function AddSectionModal({
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

AddSectionModal.propTypes = {
  addSection: PropTypes.func.isRequired,
  sectionName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setSectionName: PropTypes.func.isRequired,
}

export default memo(AddSectionModal)
