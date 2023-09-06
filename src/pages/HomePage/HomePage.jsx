import { Grid, Typography, Divider, Fab, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BasicAccordion from '../../components/OrderDetails/OrderDetails';
import { db } from '../../../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import { hasRestaurant } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';

export default function HomePage() {
  const [isOwner, _setIsOwner] = useState(hasRestaurant());
  const [readyOrders, setReadyOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [preparingTime, setPreparingTime] = useState(600);
  const orderCollection = collection(db, 'orders');
  const navigate = useNavigate();

  const handleIncreasePreparingTime = () => {
    setPreparingTime((prevTime) => prevTime + 60);
  };

  const handleDecreasePreparingTime = () => {
    setPreparingTime((prevTime) => prevTime - 60);
  };

  const navigateToCreateRestaurant = () => {
    navigate('/create-restaurant');
  };

  useEffect(() => {
    const observer = () => {
      try {
        const unsubscribe = onSnapshot(orderCollection, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => {
            const data = doc.data();
            if (
              data.orderStatus === 'Ready' ||
              data.orderStatus === 'Preparing'
            ) {
              return { id: doc.id, ...data };
            }
            return null;
          });
          const preparingOrders = updatedData.filter(
            (data) => data !== null && data.orderStatus !== 'Ready',
          );
          const newReadyOrders = updatedData.filter(
            (data) => data !== null && data.orderStatus !== 'Preparing',
          );
          setPreparingOrders(preparingOrders);
          setReadyOrders(newReadyOrders);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };
    observer();
  }, []);

  const homePage = (
    <Grid container rowGap={3}>
      <Grid container rowGap={2}>
        <Grid container justifyContent="center">
          <Typography variant="h4">Preparing Time</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container justifyContent="center" rowGap={3}>
          <Grid container justifyContent="center"></Grid>
          {preparingOrders.map((order) => {
            if (!order.items) {
              console.log('Order has no items:', order.id);
              return null; // Skip rendering this order
            }
            return (
              <Grid key={order.id} container justifyContent="center">
                <BasicAccordion
                  docId={order.id}
                  orderStatus={order.orderStatus}
                  orderId={order.orderId}
                  orderTime={order.orderTime}
                  customerName={order.customerName}
                  customerEmail={order.customerEmail}
                  customerPhoneNumber={order.customerPhoneNumber}
                  hasUtensils={order.hasUtensils}
                  items={order.items.map((item) => {
                    return {
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
                    };
                  })}
                  itemsQuantity={order.items.reduce((prevQuantity, item) => {
                    return prevQuantity + item.quantity;
                  }, 0)}
                  subTotal={order.items.reduce((prevQuantity, item) => {
                    return prevQuantity + item.totalPrice;
                  }, 0)}
                  note={order.note}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Divider textAlign="left">
            <Typography variant="h4">Ready</Typography>
          </Divider>
        </Grid>
        <Grid container justifyContent="center" rowGap={3}>
          {readyOrders.map((order) => {
            if (!order.items) {
              console.log('Order has no items:', order.id);
              return null; // Skip rendering this order
            }
            return (
              <Grid key={order.id} container justifyContent="center">
                <BasicAccordion
                  docId={order.id}
                  orderStatus={order.orderStatus}
                  orderId={order.orderId}
                  orderTime={order.orderTime}
                  customerName={order.customerName}
                  customerEmail={order.customerEmail}
                  customerPhoneNumber={order.customerPhoneNumber}
                  hasUtensils={order.hasUtensils}
                  items={order.items.map((item) => {
                    return {
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
                    };
                  })}
                  itemsQuantity={order.items.reduce((prevQuantity, item) => {
                    return prevQuantity + item.quantity;
                  }, 0)}
                  subTotal={order.items.reduce((prevQuantity, item) => {
                    return prevQuantity + item.totalPrice;
                  }, 0)}
                  note={order.note}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );

  return isOwner ? (
    <ResponsiveDrawer tab={homePage} />
  ) : (
    <Grid
      padding={10}
      container
      justifyContent="center"
      alignItems="center"
      rowGap={3}
    >
      <Grid item xs={12} textAlign="center">
        <Typography variant="h3">
          You haven't created your restaurant yet
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button
          onClick={navigateToCreateRestaurant}
          size="large"
          variant="outlined"
        >
          <ArrowBackIcon /> Click here to create your restaurant
        </Button>
      </Grid>
    </Grid>
  );
}
