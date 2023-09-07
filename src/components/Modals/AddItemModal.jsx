import { Modal, Button } from "@mui/material";
import CreateMenuPage from "../../pages/RestaurantCreation/CreateMenu/CreateMenuPage";
import React, { memo } from "react";
import PropTypes from 'prop-types';
import { GridModal } from "./style";

function AddItemModal({ handleClose, open }) {
  return (
    <Modal open={open} onClose={handleClose}>
        <GridModal maxWidth="800px" container padding={3} rowGap={3}>
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