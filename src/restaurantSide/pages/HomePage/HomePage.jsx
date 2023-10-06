import {
  Alert,
  Grid,
  Typography,
  Divider,
  Fab,
  Button,
  Snackbar,
  useTheme,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OrderDetailsAccordion from '../../components/Accordion/OrderDetails/OrderDetails';
import { db } from '../../../../firebase.config';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  where,
  query,
} from 'firebase/firestore';
import { hasRestaurant } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';
import { renderSkeleton } from '../../utils/renderUtils';
import { orderStatusEnum } from '../../utils/constant';
import OnHoldOrderModal from '../../components/Modals/OnHoldOrderModal';
import { formatTime } from '../../utils/time';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ThemeContext } from '../../Provider/ThemeContext';

export default function HomePage() {
  const [currUser, _setCurrUser] = useLocalStorage('current-user', {});
  const [isOwner, _setIsOwner] = useState(hasRestaurant());
  const [isFetching, setIsFetching] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    on: false,
    type: 'error',
  });
  const [orders, setOrders] = useState({
    onHoldOrders: [],
    readyOrders: [],
    preparingOrders: [],
    pickedUpOrders: []
  });
  const [preparingTime, setPreparingTime] = useState(0);
  const {isDarkTheme} = useContext(ThemeContext);
  const theme = useTheme();

  const historyCollection = collection(db, 'history');
  const orderCollection = collection(db, 'orders');
  const userCollection = collection(db, 'users');
  const userId = currUser.docId;
  const docRef = doc(userCollection, userId);

  const navigate = useNavigate();

  const deleteOrder = async (orderId) => {
    try {
      const orderRef = doc(orderCollection, orderId);
      await deleteDoc(orderRef);
      observer(); // Fetch the updated data after changed
    } catch (error) {
      console.log(error);
    }
  }

  const getPreparingTime = async () => {
    setIsFetching(true);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setPreparingTime(data.preparingTime);
        setNotification((prevNoti) => ({ ...prevNoti, on: false }));
        setIsFetching(false);
      } else {
        setIsFetching(false);
        setNotification({
          message: 'User does not exist',
          on: true,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecreasePreparingTime = () => {
    setPreparingTime(prevTime => prevTime - 60);
  }

  const handleIncreasePreparingTime = () => {
    setPreparingTime(prevTime => prevTime + 60);
  }

  const navigateToCreateRestaurant = () => {
    navigate('/create-restaurant');
  };

  const observer = async () => {
    try {
      // Fetch orders that belongs to current restaurant
      const ordersQuery = query(orderCollection, where('restaurantId', '==', userId));
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        const updatedData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data, orderId: `#${doc.id.slice(15)}` };
        });
        const onHoldOrders = updatedData.filter(
          (data) => data !== null && data.orderStatus === orderStatusEnum.onHoldOrders,
        );
        const preparingOrders = updatedData.filter(
          (data) => data !== null && data.orderStatus === orderStatusEnum.preparing,
        );
        const readyOrders = updatedData.filter(
          (data) => data !== null && data.orderStatus === orderStatusEnum.ready,
        );
        const pickedUpOrders = updatedData.filter(
          (data) => data !== null && data.orderStatus === orderStatusEnum.pickedUp,
        );
        setOrders({
          onHoldOrders,
          preparingOrders,
          readyOrders,
          pickedUpOrders,
        });
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };

  const updatePreparingTime = async () => {
    try {
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      await updateDoc(docRef, { ...data, preparingTime });
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrders = async (orderId) => {
    try {
      const orderRef = doc(orderCollection, orderId);
      const docSnapshot = await getDoc(orderRef);
      const data = docSnapshot.data();
      await updateDoc(orderRef, { ...data, orderStatus: orderStatusEnum.preparing });
      observer(); // Fetch the updated data after changed
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPreparingTime();
    observer();
  }, []);

  useEffect(() => {
    if(preparingTime > 0) {
      updatePreparingTime();
    }
  }, [preparingTime]);

  useEffect(() => {
    orders.pickedUpOrders.forEach(async (order) => {
      try {
        // Remove specific fields from the order
        delete order.hasUtensils;
        delete order.note;
        delete order.orderStatus;
        await addDoc(historyCollection, order);
        const docRef = doc(db, 'orders', order.id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      }
    });
  }, [orders.pickedUpOrders]);

  const homePage = (
    <Grid container rowGap={3}>
      {notification.on && (
        <Snackbar
          open={notification.on}
          autoHideDuration={6000}
          onClose={() =>
            setNotification((prevNoti) => ({ ...prevNoti, on: false }))
          }
        >
          <Alert
            onClose={() =>
              setNotification((prevNoti) => ({ ...prevNoti, on: false }))
            }
            severity={notification.type}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
      {orders.onHoldOrders &&
        orders.onHoldOrders.map((order) => (
          <OnHoldOrderModal
            key={order.id}
            customerEmail={order.customerEmail}
            customerName={order.customerName}
            customerPhoneNumber={order.customerPhoneNumber}
            deleteOrder={() => deleteOrder(order.id)}
            docId={order.id}
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
            note={order.note}
            orderId={order.orderId}
            orderTime={order.orderTime.toDate()}
            orderStatus={order.orderStatus}
            preparingTime={preparingTime}
            setOrderStatus={() => updateOrders(order.id) }
            subTotal={order.items.reduce((prevQuantity, item) => {
              return prevQuantity + item.totalPrice;
            }, 0)}
          />
        ))}
      {isFetching ? (
        <Grid
          container
          columnSpacing={2}
          justifyContent="center"
          padding={3}
          rowGap={3}
        >
          {renderSkeleton(3, 'rounded', 100)}
        </Grid>
      ) : (
        <Grid container rowGap={2} mt={3}>
          <Grid container justifyContent="center" rowGap={2}>
            <Grid item xs={12} textAlign="center">
              <Typography color={isDarkTheme ? theme.palette.text.secondary : ''} variant="h4">Preparing Time</Typography>
            </Grid>
            <Grid
              alignItems="center"
              container
              columnSpacing={3}
              justifyContent="center"
            >
              <Grid item>
                <Fab onClick={handleDecreasePreparingTime} size="small">
                  -
                </Fab>
              </Grid>
              <Grid item>
                <Typography color={isDarkTheme ? theme.palette.text.secondary : ''} variant="h6" fontWeight="bold">
                  {formatTime(preparingTime)}
                </Typography>
              </Grid>
              <Grid item>
                <Fab onClick={handleIncreasePreparingTime} size="small">
                  +
                </Fab>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container justifyContent="center" rowGap={3}>
            {orders.preparingOrders.length > 0 ? (
              orders.preparingOrders.map((order) => {
                if (!order.items) {
                  return null; // Skip rendering this order
                }
                return (
                  <Grid key={order.id} container justifyContent="center">
                    <OrderDetailsAccordion
                      docId={order.id}
                      orderStatus={order.orderStatus}
                      orderId={order.orderId}
                      orderTime={order.orderTime.toDate()}
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
                      itemsQuantity={order.items.reduce(
                        (prevQuantity, item) => {
                          return prevQuantity + item.quantity;
                        },
                        0,
                      )}
                      subTotal={order.items.reduce((prevPrice, item) => {
                        return prevPrice + item.totalPrice;
                      }, 0)}
                      note={order.note}
                      preparingTime={preparingTime}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography color={isDarkTheme ? theme.palette.text.secondary : ''} fontWeight="bold" variant="h6">
                    No New Orders At The Moment
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider textAlign="left">
              <Typography color={isDarkTheme ? theme.palette.text.secondary : ''} variant="h4">Ready</Typography>
            </Divider>
          </Grid>
          <Grid container justifyContent="center" rowGap={3}>
            {orders.readyOrders.length > 0 && orders.readyOrders.map((order) => {
              if (!order.items) {
                return null; // Skip rendering this order
              }
              return (
                <Grid key={order.id} container justifyContent="center">
                  <OrderDetailsAccordion
                    docId={order.id}
                    orderStatus={order.orderStatus}
                    orderId={order.orderId}
                    orderTime={order.orderTime.toDate()}
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
                    preparingTime={preparingTime}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
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
          You haven&apos;t created your restaurant yet
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
