import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  AccordionSummary,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import {
  AccordionStyled,
  AccordionSummaryFlexBox,
  AccordionDetailsStyled,
  TypographyStyled,
} from '../style';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { convertTimestampToDate } from '../../../utils/time';
import { reduceNameLength } from '../../../utils/string';
import { yellow } from '@mui/material/colors';
import { db } from '../../../../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

function FeedbackAccordion({
  customerName,
  docId,
  orderId,
  reviewTime,
  reviewMsg,
  reviewStars,
  recommendedItems,
  fetchFeedback,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const docRef = doc(db, 'feedback', docId);

  const handleAccordionChange = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleSubmitButton = async () => {
    try {
      await updateDoc(docRef, { restaurantResponse: responseMsg });
      fetchFeedback();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkipButton = async () => {
    try {
      await updateDoc(docRef, { restaurantResponse: 'Skip' });
      fetchFeedback();
    } catch (error) {
      console.log(error);
    }
  };

  const renderStarIcon = () => {
    const renderedStars = [];
    const notReviewedStars = 5 - reviewStars;
    for (let i = 0; i < reviewStars; i++) {
      renderedStars.push(
        <StarIcon
          key={`${orderId} - ${i}`}
          fontSize="large"
          sx={{ color: yellow[600] }}
        />,
      );
    }
    if (notReviewedStars > 0) {
      for (let i = 0; i < notReviewedStars; i++) {
        renderedStars.push(
          <StarOutlineOutlinedIcon
            key={`${orderId} - ${reviewStars + i + 1}`}
            fontSize="large"
            sx={{ color: yellow[600] }}
          />,
        );
      }
    }
    return renderedStars;
  };

  const renderRecommendedItems = () => {
    const renderItems = [];
    for (let item of recommendedItems) {
      const renderItem = (
        <Box key={item}>
          <Button color="inherit" variant="contained">
            {item}
          </Button>
        </Box>
      );
      renderItems.push(renderItem);
    }
    return renderItems;
  };

  return (
    <>
      <AccordionStyled expanded={isExpanded} onChange={handleAccordionChange}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <AccordionSummaryFlexBox>
            <Box display="flex" flexDirection="column" gap={2}>
              <TypographyStyled fontWeight="bold" variant="h6">
                {reduceNameLength(customerName)}
              </TypographyStyled>
              <TypographyStyled fontWeight="bold" variant="subtitle2">
                {orderId}
              </TypographyStyled>
            </Box>
            <Box display="flex" flexDirection="column">
              <Box>{renderStarIcon()}</Box>
              <Box>
                <Typography variant="subtitle2">
                  {convertTimestampToDate(reviewTime)}
                </Typography>
              </Box>
            </Box>
            {!isExpanded ? (
              <Box display="flex" alignItems="center" gap={2}>
                <Box>
                  <Typography variant="h6">Review:</Typography>
                </Box>
                <Box>
                  {reviewMsg.length >= 60
                    ? `${reviewMsg.slice(0, 60)}...`
                    : reviewMsg}
                </Box>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={2}>
                {renderRecommendedItems()}
              </Box>
            )}
          </AccordionSummaryFlexBox>
        </AccordionSummary>
        <AccordionDetailsStyled>
          <Grid container columnSpacing={2} mt={5}>
            <Grid item xs={12} sm={6} textAlign="center">
              <Grid container justifyContent="center" rowGap={2}>
                <Grid item xs={12}>
                  <Typography fontWeight="bold" variant="h4">
                    Review
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">{reviewMsg}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="center">
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    onChange={(e) => {
                      setResponseMsg(e.target.value);
                    }}
                    placeholder="Reply..."
                    rows={5}
                    value={responseMsg}
                    variant="filled"
                  />
                </Grid>
                <Grid item mt={2} xs={12}>
                  <Grid container justifyContent="right" columnSpacing={2}>
                    <Grid item>
                      <Button onClick={handleSkipButton} variant="contained">
                        Skip
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={handleSubmitButton}
                        color="success"
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </Grid>
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

FeedbackAccordion.propTypes = {
  customerName: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  reviewTime: PropTypes.instanceOf(Date).isRequired,
  reviewMsg: PropTypes.string.isRequired,
  reviewStars: PropTypes.number.isRequired,
  recommendedItems: PropTypes.array,
  fetchFeedback: PropTypes.func.isRequired
};

export default memo(FeedbackAccordion);
