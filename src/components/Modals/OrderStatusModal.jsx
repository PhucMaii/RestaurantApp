import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Button
} from '@mui/material';
import { ButtonGroupModal } from './style';
import { orderStatusEnum } from '../../utils/constant';

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
        {status === orderStatusEnum.preparing && (
          <>
            <Button
              color="inherit"
              key={orderStatusEnum.preparing}
              onClick={handleStatusButtonClick}
            >
              Preparing
            </Button>
            <Button
              color="warning"
              key={orderStatusEnum.ready}
              onClick={handleStatusButtonClick}
            >
              Ready
            </Button>
            <Button
              color="success"
              key={orderStatusEnum.pickedUp}
              onClick={handleStatusButtonClick}
            >
              Picked Up
            </Button>
          </>
        )}
        {status === orderStatusEnum.ready && (
          <>
            <Button
              color="warning"
              key={orderStatusEnum.ready}
              onClick={handleStatusButtonClick}
            >
              Ready
            </Button>
            <Button
              color="success"
              key={orderStatusEnum.pickedUp}
              onClick={handleStatusButtonClick}
            >
              Picked Up
            </Button>
          </>
        )}
        {status === orderStatusEnum.pickedUp && (
          <Button
            color="success"
            key={orderStatusEnum.pickedUp}
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