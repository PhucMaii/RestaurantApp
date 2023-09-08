import {
  Alert,
  Grid,
  Typography,
  Divider,
  Fab,
  Button,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OrderDetailsAccordion from "../../components/Accordion/OrderDetails/OrderDetails";
import { db } from "../../../firebase.config";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { hasRestaurant } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../../components/Sidebar/Sidebar";

export default function HomePage() {
  const [isOwner, _setIsOwner] = useState(hasRestaurant());
  const [notification, setNotification] = useState({
    message: "",
    on: false,
    type: "error",
  });
  const [readyOrders, setReadyOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [pickedUpOrders, setPickedUpOrders] = useState([]);
  const [preparingTime, setPreparingTime] = useState(0);

  const historyCollection = collection(db, "history");
  const orderCollection = collection(db, "orders");
  const userCollection = collection(db, "users");
  const userId = JSON.parse(localStorage.getItem("current-user")).docId;
  const docRef = doc(userCollection, userId);
  const preparingMinutes = Math.floor(preparingTime / 60);
  const preparingSeconds = preparingTime % 60;

  const navigate = useNavigate();

  const handleIncreasePreparingTime = () => {
    setPreparingTime((prevTime) => prevTime + 60);
  };

  const handleDecreasePreparingTime = () => {
    setPreparingTime((prevTime) => prevTime - 60);
  };

  const navigateToCreateRestaurant = () => {
    navigate("/create-restaurant");
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

  const getPreparingTime = async () => {
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setPreparingTime(data.preparingTime);
        setNotification((prevNoti) => ({ ...prevNoti, on: false }));
      } else {
        setNotification({
          message: "User does not exist",
          on: true,
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const observer = async () => {
    try {
      const unsubscribe = onSnapshot(orderCollection, (snapshot) => {
        const updatedData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        const preparingOrders = updatedData.filter(
          (data) => data !== null && data.orderStatus === "Preparing"
        );
        const newReadyOrders = updatedData.filter(
          (data) => data !== null && data.orderStatus === "Ready"
        );
        const newPickedUpOrders = updatedData.filter(
          (data) => data !== null && data.orderStatus === "Picked Up"
        );
        setPreparingOrders(preparingOrders);
        setReadyOrders(newReadyOrders);
        setPickedUpOrders(newPickedUpOrders);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPreparingTime();
    observer();
  }, []);

  useEffect(() => {
    updatePreparingTime();
  }, [preparingTime]);
  
  useEffect(() => {
    pickedUpOrders.forEach(async(order) => {
      try {
        // Remove specific fields from the order
        const {hasUtensils, note, orderStatus, ...orderWithoutFields} = order;
        await addDoc(historyCollection, orderWithoutFields);
        const docRef = doc(db, "orders", order.id);
        await deleteDoc(docRef);
      } catch(error) {
        console.log(error);
      }
    })
  }, [pickedUpOrders])

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
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
      <Grid container rowGap={2}>
        <Grid container justifyContent="center" rowGap={2}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">Preparing Time</Typography>
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
              <Typography variant="h6" fontWeight="bold">
                {preparingMinutes < 10
                  ? `0${preparingMinutes}`
                  : preparingMinutes}
                :
                {preparingSeconds < 10
                  ? `0${preparingSeconds}`
                  : preparingSeconds}
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
          {preparingOrders.map((order) => {
            if (!order.items) {
              return null; // Skip rendering this order
            }
            return (
              <Grid key={order.id} container justifyContent="center">
                <OrderDetailsAccordion
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
                  subTotal={order.items.reduce((prevPrice, item) => {
                    return prevPrice + item.totalPrice;
                  }, 0)}
                  note={order.note}
                  preparingTime={preparingTime}
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
              return null; // Skip rendering this order
            }
            return (
              <Grid key={order.id} container justifyContent="center">
                <OrderDetailsAccordion
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
                  preparingTime={preparingTime}
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
