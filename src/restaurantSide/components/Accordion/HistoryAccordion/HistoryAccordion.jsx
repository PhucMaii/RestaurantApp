import React, { useState, memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import {
  AccordionSummary,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import {
  AccordionStyled,
  AccordionSummaryFlexBox,
  AccordionDetailsStyled,
  TypographyStyled,
  ButtonStyled,
  DividerContainerStyled,
} from "../style";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { convertTimestampToDate } from "../../../utils/time";
import { formatToTwoDecimalPlace } from "../../../utils/number";
import { reduceNameLength } from "../../../utils/string";
import UserInfoModal from "../../Modals/UserInfoModal";
import { yellow } from "@mui/material/colors";
import { ThemeContext } from "../../../../Provider/ThemeContext";

function HistoryAccordion({
  customerName,
  customerEmail,
  customerPhoneNumber,
  items,
  itemsQuantity,
  orderId,
  orderTime,
  reviewMsg,
  reviewStars,
  subTotal
}) {
  const [openCustomerInfoModal, setOpenCustomerInfoModal] = useState(false);
  const {isDarkTheme} = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleOpenCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(true);
  };

  const handleCloseCustomerInfoModal = (e) => {
    e.stopPropagation();
    setOpenCustomerInfoModal(false);
  };

  const renderStarIcon = () => {
    const renderedStars = [];
    const notReviewedStars = 5 - reviewStars;
    for(let i = 0; i < reviewStars; i++) {
      renderedStars.push((
        <StarIcon key={`${orderId} - ${i}`} fontSize="large" sx={{ color: yellow[600] }} />
      ))
    }
    if(notReviewedStars > 0) {
      for(let i = 0; i < notReviewedStars; i++) {
        renderedStars.push((
          <StarOutlineOutlinedIcon key={`${orderId} - ${reviewStars + i + 1}`} fontSize="large" sx={{ color: yellow[600] }} />
        ))
      }
    }
    return renderedStars;
  } 

  return (
    <>
      <UserInfoModal
        open={openCustomerInfoModal}
        handleClose={handleCloseCustomerInfoModal}
        name={customerName}
        phoneNumber={customerPhoneNumber}
        email={customerEmail}
      />
      <AccordionStyled $isDarkTheme={isDarkTheme}>
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
            <Box>
              <TypographyStyled fontWeight="bold" variant="subtitle1">
                {t("Pick up")} {itemsQuantity} {t("items")}
              </TypographyStyled>
              <Typography fontWeight="bold" variant="subtitle1">
                {t("Total")}: ${formatToTwoDecimalPlace(subTotal * 1.12)}
              </Typography>
            </Box>
            <ButtonStyled disabled variant="contained" color="inherit">
              {t("Picked Up")}
            </ButtonStyled>
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <Typography variant="h5">{t("Review")}:</Typography>
              </Box>
              <Box>
                {renderStarIcon()}
              </Box>
            </Box>
          </AccordionSummaryFlexBox>
        </AccordionSummary>
        <AccordionDetailsStyled $isDarkTheme={isDarkTheme}>
          <Grid container>
            <Grid item xs={12} sm={6} textAlign="center">
              <Typography fontWeight="bold" variant="h4">
                {t("Order")}
              </Typography>
              {items.length > 0 && items.map((item, index) => {
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
                    {item.options &&
                      item.options.map((option, index) => {
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
                        <Typography fontWeight="bold">{t("Total")}</Typography>
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
                <Grid item mt={2} xs={12}>
                  <Typography fontWeight="bolder" variant="h4">
                    {t("Review")}
                  </Typography>
                </Grid>
                <Grid item textAlign="center" p={3}>
                  <Typography>{reviewMsg}</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" rowGap={3} mt={3}>
                <Grid item>
                  <Typography fontWeight="bolder" variant="h4">
                    {t("Total Price")}
                  </Typography>
                </Grid>
                <Grid container p={2} rowGap={3}>
                  <Grid textAlign="left" item xs={6}>
                    <Typography fontWeight="bolder" variant="subtitle1">
                      {t("Subtotal")}
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
                      {t("Tax")}
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
                      {t("Total")}
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

HistoryAccordion.propTypes = {
  customerName: PropTypes.string.isRequired,
  customerEmail: PropTypes.string.isRequired,
  customerPhoneNumber: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  itemsQuantity: PropTypes.number.isRequired,
  orderId: PropTypes.string.isRequired,
  orderTime: PropTypes.instanceOf(Date).isRequired,
  reviewMsg: PropTypes.string.isRequired,
  reviewStars: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
}

export default memo(HistoryAccordion)