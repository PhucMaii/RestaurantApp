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
  const statusEnum = {
    preparing: 'Preparing',
    ready: 'Ready',
    pickedUp: 'Picked Up'
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ButtonGroupModal
        maxWidth="500px"
        orientation="vertical"
        variant="contained"
      >
        {status === statusEnum.preparing && (
          <>
            <Button
              color="inherit"
              key={statusEnum.preparing}
              onClick={handleStatusButtonClick}
            >
              Preparing
            </Button>
            <Button
              color="warning"
              key={statusEnum.ready}
              onClick={handleStatusButtonClick}
            >
              Ready
            </Button>
            <Button
              color="success"
              key={statusEnum.pickedUp}
              onClick={handleStatusButtonClick}
            >
              Picked Up
            </Button>
          </>
        )}
        {status === statusEnum.ready && (
          <>
            <Button
              color="warning"
              key={statusEnum.ready}
              onClick={handleStatusButtonClick}
            >
              Ready
            </Button>
            <Button
              color="success"
              key={statusEnum.pickedUp}
              onClick={handleStatusButtonClick}
            >
              Picked Up
            </Button>
          </>
        )}
        {status === statusEnum.pickedUp && (
          <Button
            color="success"
            key={statusEnum.pickedUp}
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