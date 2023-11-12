import { Button, Grid, Modal, TextField } from '@mui/material'
import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { GridModal } from './style';
import { ThemeContext } from '../../../Provider/ThemeContext';
function AddSectionModal({
  addSection,
  sectionName,
  handleClose,
  open,
  setSectionName,
}) {
  const {isDarkTheme} = useContext(ThemeContext);
  return (
    <Modal open={open} onClose={handleClose}>
      <GridModal
        maxWidth="500px"
        alignItems="center"
        columnSpacing={2}
        container
        padding={3}
        $isDarkTheme={isDarkTheme}
        $topValue="50%"
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
