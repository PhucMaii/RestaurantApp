import React, { useState, useEffect } from "react";
import { Grid, Divider, Typography, Skeleton } from "@mui/material";
import HistoryAccordion from "../../components/Accordion/HistoryAccordion/HistoryAccordion";
import ResponsiveDrawer from "../../components/Sidebar/Sidebar";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { convertToDay } from "../../utils/utils";

export default function HistoryPage() {
  const [orderHistoryByDay, setOrderHistoryByDay] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const historyCollection = collection(db, "history");
  const feedbackCollection = collection(db, "feedback");

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
        where("orderTime", ">=", startDate),
        where("orderTime", "<=", endDate),
        orderBy("orderTime", "desc")
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
                  customerReview: "No Review For This Order Yet",
                  reviewStars: 5,
                },
        };
        const today = convertToDay(Timestamp.now());
        const date = convertToDay(order.orderTime);
        if (date === today) {
          newOrderHistoryByDay.Today.push(order);
        } else {
          if (!newOrderHistoryByDay[date]) {
            newOrderHistoryByDay[date] = [];
          }
          newOrderHistoryByDay[date].push(order);
        }
        setOrderHistoryByDay(newOrderHistoryByDay);
      });
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const fetchReviewStars = async (orderId) => {
    const feedbackQuery = query(
      feedbackCollection,
      where("historyOrderRef", "==", `/history/${orderId}`)
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

  const renderSkeleton = (number) => {
    const gridSkeleton = [];
    for (let i = 0; i < number; i++) {
      const skeleton = (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width={"100%"} height={60} />
        </Grid>
      );
      gridSkeleton.push(skeleton);
    }
    return gridSkeleton;
  };

  const historyPage = (
    <Grid container rowGap={2} justifyContent="center">
      <Grid container justifyContent="center" rowGap={3}>
        {isFetching && (
          <Grid container justifyContent="center" rowGap={5}>
            {renderSkeleton(6)}
          </Grid>
        )}
<<<<<<< HEAD
        <Grid item justifyContent="center">
          {orderHistoryByDay.today ? (
            orderHistoryByDay.today.map((order) => {
              return (
                <Grid item xs={12} key={order.id}>
                  <HistoryAccordion
                    orderId={order.orderId}
                    orderTime={order.orderTime}
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
                    itemsQuantity={order.items.reduce((prevQuantity, item) => {
                      return prevQuantity + item.quantity;
                    }, 0)}
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
            <Typography>No Order So Far</Typography>
          )}
        </Grid>
      </Grid>
      {Object.keys(orderHistoryByDay).map((objKey, index) => {
        if (objKey === "today") {
          return null;
        }
=======
      </Grid>
      {Object.keys(orderHistoryByDay).map((objKey, index) => {
>>>>>>> f9d850b (Refs #45: Feedback Accordion)
        return (
          <Grid container justifyContent="center" key={index} rowGap={3}>
            <Grid item xs={12} key={`grid-${index}`}>
              <Divider textAlign="left">
                <Typography variant="h4">{objKey}</Typography>
              </Divider>
            </Grid>
            <Grid item justifyContent="center">
              {orderHistoryByDay[objKey].map((order) => {
                return (
<<<<<<< HEAD
                  <Grid item xs={12} key={`order-${order.id}`}>
=======
                  <Grid
                    container
                    justifyContent="center"
                    key={`order-${order.id}`}
                  >
>>>>>>> f9d850b (Refs #45: Feedback Accordion)
                    <HistoryAccordion
                      orderId={order.orderId}
                      orderTime={order.orderTime}
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
                        0
                      )}
                      subTotal={order.items.reduce((prevPrice, item) => {
                        return prevPrice + item.totalPrice;
                      }, 0)}
                      reviewMsg={order.review.customerReview}
                      reviewStars={order.review.reviewStars}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
  return <ResponsiveDrawer tab={historyPage} />;
}
