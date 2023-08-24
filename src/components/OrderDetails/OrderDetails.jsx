import * as React from "react";
import {
  AccordionSummary,
  Typography,
  Box,
  Fab,
  Grid,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
} from "./style";
import OrderStatusModal from "../Modals/OrderStatusModal";
import UserInfoModal from "../Modals/UserInfoModal";

function BasicAccordion({
  orderId,
  orderTime,
  customerName,
  customerEmail,
  customerPhoneNumber,
  hasUtensils,
  items,
  itemsQuantity,
  subTotal,
  note,
}) {
  const [prepMin, setPrepMin] = React.useState(11);
  const [prepSec, setPrepSec] = React.useState(0);
  const [status, setStatus] = React.useState("Preparing");
  const [openStatusModal, setOpenStatusModal] = React.useState(false);
  const [openCustomerInfoModal, setOpenCustomerInfoModal] =
    React.useState(false);

  const handleOpenStatusModal = (e) => {
    e.stopPropagation();
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = (e) => {
    e.stopPropagation();
    setOpenStatusModal(false);
  };

  const handleOpenCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(true);
  };

  const handleCloseCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(false);
  };

  const handleStatusButtonClick = (e) => {
    e.stopPropagation();
    setStatus(e.currentTarget.textContent);
    setOpenStatusModal(false);
  };

  const handleIncreasePrepTime = (e) => {
    e.stopPropagation();
    setPrepMin((prevMin) => prevMin + 1);
  };

  const handleDecreasePrepTime = (e) => {
    e.stopPropagation();
    if (prepMin > 0) {
      setPrepMin((prevMin) => prevMin - 1);
    }
  };

  const reduceNameLength = (fullName) => {
    const names = fullName.split(" ");
    // Check if there are at least first name and last name
    if (names.length < 2) {
      return fullName;
    }

    const firstInitial = names[0][0].toUpperCase() + ".";
    const lastName = names[names.length - 1];
    const reducedName = firstInitial + lastName;

    return reducedName;
  };

  const formatToTwoDecimalPlace = (num) => {
    return num.toFixed(2);
  };

  React.useEffect(() => {
    // timer countdown
    const timeoutId = setTimeout(() => {
      if (prepSec > 0) {
        setPrepSec((prevSec) => prevSec - 1);
      } else if (prepMin > 0) {
        setPrepSec(59);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [prepMin, prepSec]);

  React.useEffect(() => {
    if (prepMin > 0 && prepSec === 0) {
      setPrepSec(59);
      setPrepMin((prevMin) => prevMin - 1);
    }
  }, [prepSec]);

  /* 
    When status is Ready, the timer reset to 0, 
    and when the timer is at 0, the status is set to Ready
  */
  React.useEffect(() => {
    if (status === "Ready") {
      setPrepSec(0);
      setPrepMin(0);
    }
    if (prepMin === 0 && prepSec === 0 && status !== "Picked Up") {
      setStatus("Ready");
    }
  }, [prepSec, status]);

  return (
    <>
      <OrderStatusModal
        open={openStatusModal}
        handleClose={handleCloseStatusModal}
        handleStatusButtonClick={handleStatusButtonClick}
        status={status}
      />
      <UserInfoModal
        open={openCustomerInfoModal}
        handleClose={handleCloseCustomerInfoModal}
        name={customerName}
        phoneNumber={customerPhoneNumber}
        email={customerEmail}
      />
      <AccordionStyled>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <AccordionSummaryFlexBox>
            <Box direction="column">
              <TypographyStyled fontWeight="bold" variant="subtitle1">
                {orderId}
              </TypographyStyled>
              <TypographyStyled fontWeight="light" variant="subtitle2">
                {orderTime}
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
                status === "Preparing"
                  ? "inherit"
                  : status === "Ready"
                  ? "warning"
                  : "success"
              }
              onClick={handleOpenStatusModal}
            >
              {status}
            </ButtonStyled>
            {status !== "Picked Up" && (
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
                  {prepMin < 10 ? `0${prepMin}` : prepMin}:
                  {prepSec < 10 ? `0${prepSec}` : prepSec}
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
                Total: ${formatToTwoDecimalPlace(subTotal + subTotal * 1.12)}
              </Typography>
            </Box>
          </AccordionSummaryFlexBox>
        </AccordionSummary>
        <AccordionDetailsStyled>
          <Grid container>
            <Grid item xs={12} sm={6} textAlign="center">
              <Typography fontWeight="bolder" variant="h4">
                Order
              </Typography>
              {items.map((item, index) => {
                return (
                  <Grid key={index} container rowGap={3} mt={3}>
                    <Grid container rowGap={2}>
                      <Grid textAlign="center" item xs={2}>
                        <Typography fontWeight="bold">
                          {item.quantity}
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
                      ${formatToTwoDecimalPlace(subTotal * 1.12)}
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
                      ${formatToTwoDecimalPlace(subTotal + subTotal * 1.12)}
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

export default React.memo(BasicAccordion);
