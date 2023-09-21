import React, { useState, useEffect } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';
import FeedbackAccordion from '../../components/Accordion/FeedbackAccordion/FeedbackAccordion';
import {
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
  collection,
} from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { convertToDay } from '../../utils/utils';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function FeedbackPage() {
  const [currUser, _setCurrUser] = useLocalStorage('current-user', {});
  const feedbackCollection = collection(db, 'feedback');
  const [feedbackByDay, setFeedbackByDay] = useState({});
  const userId = currUser.docId;

  useEffect(() => {
    observer();
  }, []);

  const observer = () => {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 2);
      const ordersQuery = query(
        feedbackCollection,
        where('restaurantId', '==', userId),
        where('reviewTime', '>=', startDate),
        where('reviewTime', '<=', endDate),
        orderBy('reviewTime', 'desc'),
      );
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        const newFeedbackOrderByDay = { Today: [] };
        snapshot.docs.map((doc) => {
          const feedback = doc.data();
          const docId = doc.id;
          if (!feedback.restaurantResponse) {
            const today = convertToDay(Timestamp.now().toDate());
            const date = convertToDay(feedback.reviewTime.toDate());
            if (date === today) {
              newFeedbackOrderByDay.Today.push({ ...feedback, docId });
            } else {
              if (!newFeedbackOrderByDay[date]) {
                newFeedbackOrderByDay[date] = [];
              }
              newFeedbackOrderByDay[date].push({ ...feedback, docId });
            }
          }
        });
        setFeedbackByDay(newFeedbackOrderByDay);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };
  const feedback = (
    <Grid container mt={4} rowGap={5}>
      {Object.keys(feedbackByDay).length > 0 && Object.keys(feedbackByDay).map((objKey) => {
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
                        fetchFeedback={observer}
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
