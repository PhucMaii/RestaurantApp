import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";
import GoogleMaps from "../../../components/GoogleMaps";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../firebase.config";
import {
  GridContainerStyled,
  GridStyled,
  TitleStyled,
  TopicImageStyled,
} from "./styles";
import { addDoc, collection } from "firebase/firestore";

export default function SignupPage() {
  const [restaurantData, setRestaurantData] = useState({});
  const [notifications, setNotifications] = useState({});
  const [receivedAdress, setReceivedAddress] = useState(null);

  useEffect(() => {
    if (receivedAdress) {
      setRestaurantData({
        ...restaurantData,
        address: receivedAdress,
      });
    }
  }, [receivedAdress]);

  const handleReceiveAddress = (data) => {
    setReceivedAddress(data);
  };

  const handleCreateRestaurant = async () => {
    try {
      const userCollection = collection(db, "users");
      const userAuthData = localStorage.getItem("current-user");
      const data = { ...userAuthData, ...restaurantData };
      await addDoc(userCollection, data);
      setNotifications({
        on: true,
        type: "success",
        message:
          "Congratulations! You Created Your Own Restaurant Successfully",
      });
    } catch (error) {
      setNotifications({
        on: true,
        type: "error",
        message: error.code,
      });
    }
  };

  return (
    <GridStyled container columnSpacing={2}>
      <Grid item xs={6}>
        <TitleStyled color="secondary" variant="h3">
          Account creation successful! Now, let's input your restaurant details.
        </TitleStyled>
        {notifications.on && (
          <Alert severity={notifications.type}>{notifications.message}</Alert>
        )}
        <GridContainerStyled container rowGap={4}>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Bamboo Restaurant"
                label="Restaurant Name"
                value={restaurantData.restaurantName}
                onChange={(e) =>
                  setRestaurantData({
                    ...restaurantData,
                    restaurantName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Chinese"
                label="Restaurant Type"
                value={restaurantData.restaurantType}
                onChange={(e) =>
                  setRestaurantData({
                    ...restaurantData,
                    restaurantType: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: +1 (111) 111 - 1111"
                label="Phone Number"
                value={restaurantData.phoneNumber}
                onChange={(e) =>
                  setRestaurantData({
                    ...restaurantData,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <GoogleMaps onDataReceived={handleReceiveAddress} />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid item xs={12}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleCreateRestaurant}
              >
                CREATE YOUR RESTAURANT
              </Button>
            </Grid>
          </Grid>
        </GridContainerStyled>
      </Grid>
      <Grid item xs={6}>
        <TopicImageStyled src="https://i.pinimg.com/564x/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.jpg" />
      </Grid>
    </GridStyled>
  );
}
