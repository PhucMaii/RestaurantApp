import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import {
  AccordionSummary,
  Typography,
  Box,
  Fab,
  Grid,
  Divider,
} from '@mui/material';
import {
  GreenText,
  RedText,
  AccordionStyled,
  AccordionSummaryFlexBox,
  AccordionDetailsStyled,
  TimerFlexBox,
  TypographyStyled,
  ButtonStyled,
  DividerContainerStyled,
} from "../style";
import OrderStatusModal from "../../Modals/OrderStatusModal";
import UserInfoModal from "../../Modals/UserInfoModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { convertTimestampToDate, formatToTwoDecimalPlace, reduceNameLength } from "../../../utils/utils";

function OrderDetailsAccordion({
  customerEmail,
  customerName,
  customerPhoneNumber,
  docId,
  hasUtensils,
  items,
  itemsQuantity,
  note,
  orderId,
  orderTime,
  orderStatus,
  preparingTime,
  subTotal,
}) {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openCustomerInfoModal, setOpenCustomerInfoModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(preparingTime);
  const [status, setStatus] = useState(orderStatus);
  
  // Get the remaining time if the page is refreshed
  useEffect(() => {
    const localRemainingTime = localStorage.getItem(docId);
    setRemainingTime(parseInt(localRemainingTime));

    // For testing only
    startTimer();
  }, []);

  useEffect(() => {
    const timeInterval = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        localStorage.setItem(docId, remainingTime - 1);
      } else {
        clearTimeout(timeInterval);
      }
    }, 1000);
    return () => {
      clearTimeout(timeInterval);
    };
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime === 0 && status !== 'Picked Up') {
      setStatus('Ready');
    }
    if (status === 'Ready') {
      setRemainingTime(0);
      localStorage.setItem(docId, remainingTime);
    }
  }, [remainingTime, status]);

  useEffect(() => {
    const orderRef = doc(db, 'orders', docId);
    const updateStatus = async () => {
      try {
        await updateDoc(orderRef, { orderStatus: status });
        console.log('Updated');
      } catch (error) {
        console.log(error);
      }
    };
    updateStatus();
  }, [status]);

  const handleCloseStatusModal = (e) => {
    e.stopPropagation();
    setOpenStatusModal(false);
  };

  const handleCloseCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(false);
  };

  const handleDecreasePrepTime = (e) => {
    e.stopPropagation();
    if (remainingTime > 60) {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 60);
      localStorage.setItem(docId, remainingTime - 60);
    }
  };

  const handleIncreasePrepTime = (e) => {
    e.stopPropagation();
    setRemainingTime((prevRemainingTime) => prevRemainingTime + 60);
    localStorage.setItem(docId, remainingTime + 60);
  };

  const handleOpenCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(true);
  };

  const handleOpenStatusModal = (e) => {
    e.stopPropagation();
    setOpenStatusModal(true);
  };

  const handleStatusButtonClick = (e) => {
    e.stopPropagation();
    setStatus(e.currentTarget.textContent);
    setOpenStatusModal(false);
  };

  // Save the remaining time on localStorage
  const startTimer = () => {
    localStorage.setItem(docId, preparingTime);
    setRemainingTime(preparingTime);
  };


  return (
    <>
      <OrderStatusModal
        handleClose={handleCloseStatusModal}
        handleStatusButtonClick={handleStatusButtonClick}
        open={openStatusModal}
        status={status}
      />
      <UserInfoModal
        email={customerEmail}
        handleClose={handleCloseCustomerInfoModal}
        name={customerName}
        open={openCustomerInfoModal}
        phoneNumber={customerPhoneNumber}
      />
      <AccordionStyled>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <AccordionSummaryFlexBox>
            <Box direction="column">
              <TypographyStyled fontWeight="bold" variant="subtitle1">
                {orderId}
              </TypographyStyled>
              <TypographyStyled fontWeight="light" variant="subtitle2">
                {convertTimestampToDate(orderTime)}
              </TypographyStyled>
            </Box>
            <ButtonStyled
              onClick={handleOpenCustomerInfoModal}
              variant="contained"
            >
              {reduceNameLength(customerName)}
            </ButtonStyled>
            {hasUtensils ? (
              <GreenText variant="subtitle1">Need Utensils</GreenText>
            ) : (
              <RedText variant="subtitle1">No Utensils</RedText>
            )}
            <ButtonStyled
              variant="contained"
              color={
                status === 'Preparing'
                  ? 'inherit'
                  : status === 'Ready'
                  ? 'warning'
                  : 'success'
              }
              onClick={handleOpenStatusModal}
            >
              {status}
            </ButtonStyled>
            {status !== 'Picked Up' && (
              <TimerFlexBox>
                <Fab
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleDecreasePrepTime}
                >
                  -
                </Fab>
                <Typography variant="subtitle1">
                  {Math.floor(remainingTime / 60) < 10
                    ? `0${Math.floor(remainingTime / 60)}`
                    : Math.floor(remainingTime / 60)}
                  :
                  {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
                </Typography>
                <Fab
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleIncreasePrepTime}
                >
                  +
                </Fab>
              </TimerFlexBox>
            )}
            <Box direction="column">
              <TypographyStyled fontWeight="bold" variant="subtitle1">
                Pick up {itemsQuantity} items
              </TypographyStyled>
              <Typography fontWeight="bold" variant="subtitle1">
                Total: ${formatToTwoDecimalPlace(subTotal * 1.12)}
              </Typography>
            </Box>
          </AccordionSummaryFlexBox>
        </AccordionSummary>
        <AccordionDetailsStyled>
          <Grid container>
            <Grid item xs={12} sm={6} textAlign="center">
              <Typography fontWeight="bold" variant="h4">
                Order
              </Typography>
              {items.map((item, index) => {
                return (
                  <Grid key={index} container rowGap={3} mt={3}>
                    <Grid container rowGap={2}>
                      <Grid textAlign="center" item xs={2}>
                        <Typography fontWeight="bold">
                          x{item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={7} textAlign="left">
                        <Typography fontWeight="bold">{item.name}</Typography>
                      </Grid>
                      <Grid item xs={3} textAlign="right">
                        <Typography fontWeight="bold">
                          ${formatToTwoDecimalPlace(item.price)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                    {item.options.map((option, index) => {
                      return (
                        <Grid key={index} container rowGap={2}>
                          <Grid textAlign="center" item xs={2}>
                            <Typography>{index + 1}</Typography>
                          </Grid>
                          <Grid item xs={7} textAlign="left">
                            <Typography>{option.name}</Typography>
                          </Grid>
                          <Grid item xs={3} textAlign="right">
                            <Typography>
                              ${formatToTwoDecimalPlace(option.price)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Grid container rowGap={2}>
                      <Grid textAlign="center" item xs={2}></Grid>
                      <Grid item xs={7} textAlign="left">
                        <Typography fontWeight="bold">Total</Typography>
                      </Grid>
                      <Grid item xs={3} textAlign="right">
                        <Typography fontWeight="bold">
                          ${formatToTwoDecimalPlace(item.totalPrice)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <DividerContainerStyled item xs={1} textAlign="center">
              <Divider orientation="vertical" />
            </DividerContainerStyled>
            <Grid item xs={12} sm={5} textAlign="center">
              <Grid container justifyContent="center">
                <Grid item mt={2}>
                  <Typography fontWeight="bolder" variant="h4">
                    Note
                  </Typography>
                </Grid>
                <Grid item textAlign="center" p={3}>
                  <Typography>{note}</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" rowGap={3} mt={3}>
                <Grid item>
                  <Typography fontWeight="bolder" variant="h4">
                    Total Price
                  </Typography>
                </Grid>
                <Grid container p={2} rowGap={3}>
                  <Grid textAlign="left" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      Subtotal
                    </Typography>
                  </Grid>
                  <Grid textAlign="right" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      ${formatToTwoDecimalPlace(subTotal)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid textAlign="left" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      Tax
                    </Typography>
                  </Grid>
                  <Grid textAlign="right" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      ${formatToTwoDecimalPlace(subTotal * 0.12)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid textAlign="left" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      Total
                    </Typography>
                  </Grid>
                  <Grid textAlign="right" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      ${formatToTwoDecimalPlace(subTotal * 1.12)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetailsStyled>
      </AccordionStyled>
    </>
  );
}

OrderDetailsAccordion.propTypes = {
  customerEmail: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  customerPhoneNumber: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  hasUtensils: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  itemsQuantity: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  orderTime: PropTypes.instanceOf(Date).isRequired,
  orderStatus: PropTypes.string.isRequired,
  preparingTime: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
}

export default memo(OrderDetailsAccordion);