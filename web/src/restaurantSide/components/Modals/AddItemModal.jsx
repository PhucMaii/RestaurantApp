import { Button, Modal } from "@mui/material";
import CreateMenuPage from "../../pages/RestaurantCreation/CreateMenu/CreateMenuPage";
import React, { memo, useContext } from "react";
import PropTypes from 'prop-types';
import { GridModal } from "./style";
import { ThemeContext } from '../../../Provider/ThemeContext';

function AddItemModal({ handleClose, open }) {
  const {isDarkTheme} = useContext(ThemeContext);
  return (
    <Modal open={open} onClose={handleClose}>
        <GridModal $topValue="50%" maxWidth="800px" container padding={3} rowGap={3} $isDarkTheme={isDarkTheme} >
          <CreateMenuPage />
          <Button
            color="success"
            fullWidth
            onClick={handleClose}
            variant="contained"
          >
            Finish
          </Button>
        </GridModal>
    </Modal>
  );
}

AddItemModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default memo(AddItemModal)