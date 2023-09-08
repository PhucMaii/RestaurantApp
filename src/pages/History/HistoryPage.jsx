import React, { useState, useEffect } from "react";
import { Grid, Divider, Typography } from "@mui/material";
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
import { convertTimestampToDate } from "../../utils/utils";

export default function HistoryPage() {
  const [orderHistoryByDay, setOrderHistoryByDay] = useState({});
  const historyCollection = collection(db, "history");

  useEffect(() => {
    // Get orders since 3 days ago
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 3);
    fetchHistoryByDay(startDate, endDate);
  }, []);

  const fetchHistoryByDay = async (startDate, endDate) => {
    try {
      const orders = query(
        historyCollection,
        where("orderTime", ">=", startDate),
        where("orderTime", "<=", endDate),
        orderBy("orderTime", "desc")
      );
      const newOrderHistoryByDay = { today: [] };
      const querySnapshot = await getDocs(orders);
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        const orderTime = order.orderTime;
        const currentTimestamp = Timestamp.now();
        const formattedToday = convertTimestampToDate(currentTimestamp);
        const formattedDate = convertTimestampToDate(orderTime);
        const today = formattedToday.split(" at ")[0];
        const date = formattedDate.split(" at ")[0];
        if (date === today) {
          newOrderHistoryByDay.today.push(order);
        } else {
          if (!newOrderHistoryByDay[date]) {
            newOrderHistoryByDay[date] = [];
          }
          newOrderHistoryByDay[date].push(order);
        }
      });
      setOrderHistoryByDay(newOrderHistoryByDay);
    } catch (error) {
      console.log(error);
    }
  };

  const historyPage = (
    <Grid container rowGap={2}>
      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography variant="h4">Today</Typography>
        </Divider>
      </Grid>
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
              />
            </Grid>
          );
        })
      ) : (
        <Typography>There is no order today</Typography>
      )}
      {Object.keys(orderHistoryByDay).map((key) => {
        if (key === "today") {
          return;
        }
        return (
          <>
            <Grid item xs={12} key={key}>
              <Divider textAlign="left">
                <Typography variant="h4">{key}</Typography>
              </Divider>
            </Grid>
            {orderHistoryByDay[key].map((order) => {
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
                  />
                </Grid>
              );
            })}
          </>
        );
      })}
    </Grid>
  );
  return <ResponsiveDrawer tab={historyPage} />;
}
