import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Button
} from '@mui/material';
import { ButtonGroupModal } from './style';

function OrderStatusModal({
  handleClose,
  open,
  handleStatusButtonClick,
  status,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <ButtonGroupModal
        maxWidth="500px"
        orientation="vertical"
        variant="contained"
      >
        {status === 'Preparing' && (
          <>
            <Button
              color="inherit"
              key="Preparing"
              onClick={handleStatusButtonClick}
            >
              Preparing
            </Button>
            <Button
              color="warning"
              key="Ready"
              onClick={handleStatusButtonClick}
            >
              Ready
            </Button>
            <Button
              color="success"
              key="PickedUp"
              onClick={handleStatusButtonClick}
            >
              Picked Up
            </Button>
          </>
        )}
        {status === 'Ready' && (
          <>
            <Button
              color="warning"
              key="Ready"
              onClick={handleStatusButtonClick}
            >
              Ready
            </Button>
            <Button
              color="success"
              key="PickedUp"
              onClick={handleStatusButtonClick}
            >
              Picked Up
            </Button>
          </>
        )}
        {status === 'Picked Up' && (
          <Button
            color="success"
            key="PickedUp"
            onClick={handleStatusButtonClick}
          >
            Picked Up
          </Button>
        )}
      </ButtonGroupModal>
    </Modal>
  );
}

OrderStatusModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleStatusButtonClick: PropTypes.func.isRequired,
  status:  PropTypes.string.isRequired,
}

export default memo(OrderStatusModal)