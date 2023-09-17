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
import UserInfoModal from "../../Modals/UserInfoModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { convertTimestampToDate, formatTime, formatToTwoDecimalPlace, reduceNameLength } from "../../../utils/utils";
import { orderStatusEnum } from '../../../utils/constant';

function OnHoldOrderDetailsAccordion({
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
  subTotal,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openCustomerInfoModal, setOpenCustomerInfoModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(() => {
    const localData = JSON.parse(localStorage.getItem(`${docId}_onHold`));
    if(localData && localData.remainingTime) {
      return localData.remainingTime;
    }
    return 120;
  });
  const [status, setStatus] = useState(orderStatus);
  const orderRef = doc(db, 'orders', docId);
  
  // Get the remaining time if the page is refreshed
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem(`${docId}_onHold`))) {
      localStorage.setItem(
        `${docId}_onHold`,
        JSON.stringify({ lastTimeSaveData: Date.now(), remainingTime }),
      );
    } else {
      const localRemainingTime = JSON.parse(localStorage.getItem(`${docId}_onHold`));
      const today = Date.now();
      const differenceTime = Math.floor(
        (today - localRemainingTime.lastTimeSaveData) / 2000,
      );
      const newRemainingTime = localRemainingTime.remainingTime - differenceTime;
      setRemainingTime(newRemainingTime)
      startTimer(newRemainingTime);
    }
  }, []);

  useEffect(() => {
    const timeInterval = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        const localData = JSON.parse(localStorage.getItem(`${docId}_onHold`))
        const timeData = { ...localData, remainingTime: remainingTime - 1};
        localStorage.setItem(`${docId}_onHold`, JSON.stringify(timeData));
      } else {
        clearTimeout(timeInterval);
      }
    }, 1000);
    return () => {
      clearTimeout(timeInterval);
    };
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime === 0) {
      if (status === orderStatusEnum.onHoldOrders) {
        setStatus(orderStatusEnum.preparing);
        setRemainingTime(120);
      } else if (status === orderStatusEnum.preparing) {
        setStatus(orderStatusEnum.ready);
      }
    }
    if (status === orderStatusEnum.ready) {
      setRemainingTime(0);
      localStorage.setItem(`${docId}_onHold`, remainingTime);
    }
  }, [remainingTime, status]);

  useEffect(() => {
    const updateStatus = async () => {
      try {
        await updateDoc(orderRef, { orderStatus: status });
      } catch (error) {
        console.log(error);
      }
    };
    updateStatus();
  }, [status]);

  const handleCloseCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(false);
  };

  const handleOpenCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(true);
  };

  // Save the remaining time on localStorage
  const startTimer = (saveRemainTime) => {
    const lastTimeSaveData = Date.now(); 
    const timeData = JSON.stringify({remainingTime: saveRemainTime, lastTimeSaveData})
    localStorage.setItem(`${docId}_onHold`, timeData)
  };

  return (
    <>
      <UserInfoModal
        email={customerEmail}
        handleClose={handleCloseCustomerInfoModal}
        name={customerName}
        open={openCustomerInfoModal}
        phoneNumber={customerPhoneNumber}
      />
      <AccordionStyled expanded={isExpanded} onChange={() => setIsExpanded((prevExpanded) => !prevExpanded)}>
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
              disabled={status === orderStatusEnum.onHoldOrders}
              variant="contained"
              color={
                status === orderStatusEnum.preparing
                  ? 'inherit'
                  : status === orderStatusEnum.ready
                  ? 'warning'
                  : 'success'
              }
            >
              {status}
            </ButtonStyled>
            {status !== orderStatusEnum.pickedUp && (
              <TimerFlexBox>
                <Fab
                  disabled={status === orderStatusEnum.onHoldOrders}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  -
                </Fab>
                <Typography variant="subtitle1">
                  {formatTime(remainingTime)}
                </Typography>
                <Fab
                  disabled={status === orderStatusEnum.onHoldOrders}
                  variant="contained"
                  size="small"
                  color="primary"
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
                <Grid item xs={12} mt={2}>
                  <Typography fontWeight="bolder" variant="h4">
                    Note
                  </Typography>
                </Grid>
                <Grid item xs={12} textAlign="center" p={3}>
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

OnHoldOrderDetailsAccordion.propTypes = {
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
  subTotal: PropTypes.number.isRequired,
}

export default memo(OnHoldOrderDetailsAccordion);
