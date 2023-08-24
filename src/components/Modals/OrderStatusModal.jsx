import React from 'react'
import {
    Modal,
    ButtonGroup,
    Button
} from '@mui/material'

export default function OrderStatusModal(props) {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <ButtonGroup
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "500px"
        }}
        orientation="vertical"
        variant="contained"
      >
        <Button 
            color="inherit" 
            key="Preparing"
            onClick={props.handleStatusButtonClick}
        >
          Preparing
        </Button>
        <Button 
            color="warning" 
            key="Ready"
            onClick={props.handleStatusButtonClick}
        >
          Ready
        </Button>
        <Button 
            color="success" 
            key="PickedUp"
            onClick={props.handleStatusButtonClick}
        >
          Picked Up
        </Button>
      </ButtonGroup>
    </Modal>
  );
}
