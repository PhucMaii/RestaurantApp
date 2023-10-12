import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Divider, Typography } from '@mui/material';
import HistoryAccordion from '../../components/Accordion/HistoryAccordion/HistoryAccordion';
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { renderSkeleton } from '../../utils/renderUtils';
import { convertToDay } from '../../utils/time';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { ThemeContext } from '../../../Provider/ThemeContext';

export default function HistoryPage() {
  const [currUser, _setCurrUser] = useLocalStorage('current-user', {});
  const [orderHistoryByDay, setOrderHistoryByDay] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const {isDarkTheme} = useContext(ThemeContext);
  const { t } = useTranslation();
  const historyCollection = collection(db, 'history');
  const feedbackCollection = collection(db, 'feedback');
  const userId = currUser.docId;
  
  useEffect(() => {
    // Get orders since 3 days ago
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 2);
    fetchHistoryByDay(startDate, endDate);
  }, []);

  const fetchHistoryByDay = async (startDate, endDate) => {
    setIsFetching(true);
    try {
      const orders = query(
        historyCollection,
        where('restaurantId', '==', userId),
        where('orderTime', '>=', startDate),
        where('orderTime', '<=', endDate),
        orderBy('orderTime', 'desc'),
      );
      const newOrderHistoryByDay = { Today: [] };
      const querySnapshot = await getDocs(orders);
      querySnapshot.forEach(async (doc) => {
        const orderData = doc.data();
        const review = await fetchReviewStars(doc.id);
        const order = {
          ...orderData,
          review:
            Object.keys(review).length !== 0
              ? { ...review }
              : {
                  customerReview: t('No Review For This Order Yet'),
                  reviewStars: 5,
                },
        };
        const today = convertToDay(Timestamp.now().toDate());
        const date = convertToDay(order.orderTime.toDate());
        if (date === today) {
          newOrderHistoryByDay.Today.push(order);
        } else {
          if (!newOrderHistoryByDay[date]) {
            newOrderHistoryByDay[date] = [];
          }
          newOrderHistoryByDay[date].push(order);
        }
      });
      setOrderHistoryByDay(newOrderHistoryByDay);
      // Wait for updated state
      await new Promise((resolve) => setTimeout(resolve, 400));
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const fetchReviewStars = async (orderId) => {
    const feedbackQuery = query(
      feedbackCollection,
      where('historyOrderRef', '==', `/history/${orderId}`),
    );
    let review = {};
    try {
      const querySnapshot = await getDocs(feedbackQuery);
      querySnapshot.forEach((doc) => {
        const feedbackData = doc.data();
        review.reviewStars = feedbackData.reviewStars;
        review.customerReview = feedbackData.customerReview;
      });
      return review;
    } catch (error) {
      console.log(error);
    }
  };

  const historyPage = (
    <Grid container rowGap={2} justifyContent="center" mt={3}>
      {isFetching ? (
        <Grid container justifyContent="center" rowGap={5}>
          {renderSkeleton(6, "rounded", 100)}
        </Grid>
      ) : 
      (Object.keys(orderHistoryByDay).map((objKey, index) => {
        return (
          <Grid container justifyContent="center" key={index} rowGap={3}>
            <Grid item xs={12} key={`grid-${index}`}>
              <Divider textAlign="left">
                <Typography color={isDarkTheme ? "secondary" : ""} variant="h4">{t(objKey)}</Typography>
              </Divider>
            </Grid>
            <Grid container rowGap={3}>
              {orderHistoryByDay[objKey].length > 0 ? (
                orderHistoryByDay[objKey].map((order) => {
                  return (
                    <Grid
                      container
                      justifyContent="center"
                      key={`order-${order.id}`}
                    >
                      <HistoryAccordion
                        orderId={order.orderId}
                        orderTime={order.orderTime.toDate()}
                        customerName={order.customerName}
                        customerEmail={order.customerEmail}
                        customerPhoneNumber={order.customerPhoneNumber}
                        items={order.items.map((item) => ({
                          name: item.name,
                          options: item.options
                            ? item.options.map((option) => {
                                return {
                                  name: option.name,
                                  price: option.price,
                                };
                              })
                            : [],
                          price: item.price,
                          quantity: item.quantity,
                          totalPrice: item.totalPrice,
                        }))}
                        itemsQuantity={order.items.reduce(
                          (prevQuantity, item) => {
                            return prevQuantity + item.quantity;
                          },
                          0,
                        )}
                        subTotal={order.items.reduce((prevPrice, item) => {
                          return prevPrice + item.totalPrice;
                        }, 0)}
                        reviewMsg={order.review.customerReview}
                        reviewStars={order.review.reviewStars}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12} textAlign="center">
                  <Typography color={isDarkTheme ? "secondary" : ""} fontWeight="bold" variant="h6">
                    {t("No Review So Far")}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        );
      })
      )}
    </Grid>
  );
  return <ResponsiveDrawer tab={historyPage} />;
}
