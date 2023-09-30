import { Grid, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GridModal } from './style';
import OnHoldOrderDetailsAccordion from '../Accordion/OrderDetails/OnHoldOrderDetails';

function OnHoldOrderModal({
  customerEmail,
  customerName,
  customerPhoneNumber,
  deleteOrder,
  docId,
  hasUtensils,
  items,
  itemsQuantity,
  note,
  orderId,
  orderTime,
  orderStatus,
  preparingTime,
  setOrderStatus,
  subTotal,
}) {
  const [open, setOpen] = useState(true);

  const handleConfirmOrder = () => {
    setOrderStatus();
    localStorage.removeItem(`${docId}_onHold`);
    setOpen(false);
  };

  const handleCancelOrder = () => {
    deleteOrder();
    localStorage.removeItem(`${docId}_onHold`);
    setOpen(false);
  };
  return (
    <Modal open={open}>
      <GridModal
        maxWidth="1150px"
        alignItems="center"
        justifyContent="center"
        container
        padding={2}
        rowGap={2}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <OnHoldOrderDetailsAccordion
              customerEmail={customerEmail}
              customerName={customerName}
              customerPhoneNumber={customerPhoneNumber}
              docId={docId}
              hasUtensils={hasUtensils}
              items={items}
              itemsQuantity={itemsQuantity}
              note={note}
              orderId={orderId}
              orderTime={orderTime}
              orderStatus={orderStatus}
              preparingTime={preparingTime}
              subTotal={subTotal}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleCancelOrder}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleConfirmOrder}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </GridModal>
    </Modal>
  );
}

OnHoldOrderModal.propTypes = {
    customerEmail: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    customerPhoneNumber: PropTypes.string.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    docId: PropTypes.string.isRequired,
    hasUtensils: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    itemsQuantity: PropTypes.number.isRequired,
    note: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    orderTime: PropTypes.instanceOf(Date).isRequired,
    orderStatus: PropTypes.string.isRequired,
    setOrderStatus: PropTypes.func.isRequired,
    preparingTime: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
  }
  
export default OnHoldOrderModal;