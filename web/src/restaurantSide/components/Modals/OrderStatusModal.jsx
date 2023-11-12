import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    Modal,
    Button
} from '@mui/material';
import { ButtonGroupModal } from './style';
import { orderStatusEnum } from '../../../utils/constant';

function OrderStatusModal({
  handleClose,
  open,
  handleStatusButtonClick,
  status,
}) {
  const { t } = useTranslation();
  const preparingStatus = t("Preparing");
  const readyStatus = t("Ready");
  const pickedupStatus = t("Picked Up");
 
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
              value={orderStatusEnum.preparing}
              onClick={handleStatusButtonClick}
            >
              {preparingStatus}
            </Button>
            <Button
              color="warning"
              key={orderStatusEnum.ready}
              value={orderStatusEnum.ready}
              onClick={handleStatusButtonClick}
            >
              {readyStatus}
            </Button>
            <Button
              color="success"
              key={orderStatusEnum.pickedUp}
              value={orderStatusEnum.pickedUp}
              onClick={handleStatusButtonClick}
            >
              {pickedupStatus}
            </Button>
          </>
        )}
        {status === orderStatusEnum.ready && (
          <>
            <Button
              color="warning"
              key={orderStatusEnum.ready}
              value={orderStatusEnum.ready}
              onClick={handleStatusButtonClick}
            >
              {readyStatus}
            </Button>
            <Button
              color="success"
              key={orderStatusEnum.pickedUp}
              value={orderStatusEnum.pickedUp}
              onClick={handleStatusButtonClick}
            >
              {pickedupStatus}
            </Button>
          </>
        )}
        {status === orderStatusEnum.pickedUp && (
          <Button
            color="success"
            key={orderStatusEnum.pickedUp}
            value={orderStatusEnum.pickedUp}
            onClick={handleStatusButtonClick}
          >
            {pickedupStatus}
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