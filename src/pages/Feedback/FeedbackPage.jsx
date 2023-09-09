import React, { useState, useEffect } from 'react';
import { Divider, Grid, Skeleton, Typography } from '@mui/material';
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';
import FeedbackAccordion from '../../components/Accordion/FeedbackAccordion/FeedbackAccordion';
import {
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
  collection,
} from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { convertToDay } from '../../utils/utils';

export default function FeedbackPage() {
  const feedbackCollection = collection(db, 'feedback');
  const [isFetching, setIsFetching] = useState(false);
  const [feedbackByDay, setFeedbackByDay] = useState({});

  useEffect(() => {
    // Get orders since 3 days ago
    fetchFeedbackByDay();
  }, []);

  const fetchFeedbackByDay = async () => {
    setIsFetching(true);
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 2);
    try {
      const q = query(
        feedbackCollection,
        where('reviewTime', '>=', startDate),
        where('reviewTime', '<=', endDate),
        orderBy('reviewTime', 'desc'),
      );
      const newOrderHistoryByDay = { Today: [] };
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const feedback = doc.data();
        const docId = doc.id;
        if (!feedback.restaurantResponse) {
          const today = convertToDay(Timestamp.now().toDate());
          const date = convertToDay(feedback.reviewTime.toDate());
          if (date === today) {
            newOrderHistoryByDay.Today.push({ ...feedback, docId });
          } else {
            if (!newOrderHistoryByDay[date]) {
              newOrderHistoryByDay[date] = [];
            }
            newOrderHistoryByDay[date].push({ ...feedback, docId });
          }
        }
      });
      setFeedbackByDay(newOrderHistoryByDay);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const renderSkeleton = (number) => {
    const gridSkeleton = [];
    for (let i = 0; i < number; i++) {
      const skeleton = (
        <Grid item xs={12} key={i}>
          <Skeleton variant="rectangular" width={'100%'} height={60} />
        </Grid>
      );
      gridSkeleton.push(skeleton);
    }
    return gridSkeleton;
  };

  const feedback = (
    <Grid container mt={4} rowGap={5}>
      {isFetching && (
        <Grid container rowGap={3}>
          {renderSkeleton(6)}
        </Grid>
      )}
      {Object.keys(feedbackByDay).map((objKey) => {
        return (
          <Grid container rowGap={3} key={objKey}>
            <Grid item xs={12} key={objKey}>
              <Divider textAlign="left">
                <Typography variant="h4">{objKey}</Typography>
              </Divider>
            </Grid>
            <Grid container rowGap={3}>
              {feedbackByDay[objKey].length > 0 ? (
                feedbackByDay[objKey].map((feedback, index) => {
                  return (
                    <Grid container justifyContent="center" key={index}>
                      <FeedbackAccordion
                        customerName={feedback.customerName}
                        docId={feedback.docId}
                        orderId={feedback.orderId}
                        reviewMsg={feedback.customerReview}
                        reviewStars={feedback.reviewStars}
                        recommendedItems={
                          feedback.recommendedItems
                            ? feedback.recommendedItems
                            : ''
                        }
                        reviewTime={feedback.reviewTime.toDate()}
                        fetchFeedback={fetchFeedbackByDay}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12} textAlign="center">
                  <Typography fontWeight="bold" variant="h6">
                    No Review So Far
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
  return <ResponsiveDrawer tab={feedback} />;
}
