import React, { memo } from 'react'
import {
    Modal,
    Button
} from '@mui/material'
import { ButtonGroupModal } from './style';

function OrderStatusModal(props) {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <ButtonGroupModal
        maxWidth="500px"
        orientation="vertical"
        variant="contained"
      >
        {props.status === 'Preparing' && (
          <>
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
          </>
        )}
        {props.status === 'Ready' && (
          <>
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
          </>
        )}
        {props.status === 'Picked Up' && (
          <Button
            color="success"
            key="PickedUp"
            onClick={props.handleStatusButtonClick}
          >
            Picked Up
          </Button>
        )}
      </ButtonGroupModal>
    </Modal>
  );
}
export default memo(OrderStatusModal)