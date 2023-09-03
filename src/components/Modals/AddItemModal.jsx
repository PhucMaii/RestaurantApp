import { Modal, Button } from "@mui/material";
import CreateMenuPage from "../../pages/RestaurantCreation/CreateMenu/CreateMenuPage";
import React from "react";
import { GridModal } from "./style";

export default function AddItemModal({ handleClose, open }) {
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
