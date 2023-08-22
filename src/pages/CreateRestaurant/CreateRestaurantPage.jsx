import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
} from "@mui/material";
import GoogleMaps from "../../components/GoogleMaps";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase.config";
import {
  GridContainerStyled,
  GridStyled,
  TitleStyled,
  TopicImageStyled,
} from "./styles";
import { addDoc, collection } from "firebase/firestore";

export default function SignupPage() {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState(null);

  const handleReceiveAddress = (data) => {
    setAddress(data);
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userCollection = collection(db, "users");
      const data = {
        name: restaurantName,
        uid: user.uid,
        email: user.email,
        password: password,
        restaurantType: restaurantType,
        phoneNumber: phoneNumber,
        address: address.description,
      };
      await addDoc(userCollection, data);
      console.log("Add restaurant successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GridStyled container columnSpacing={2}>
      <Grid item xs={6}>
        <TitleStyled color="secondary" variant="h3">
          Account creation successful! Now, let's input your restaurant details.
        </TitleStyled>
        <GridContainerStyled container rowGap={4}>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Bamboo Restaurant"
                label="Restaurant Name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Chinese"
                label="Restaurant Type"
                value={restaurantType}
                onChange={(e) => setRestaurantType(e.target.value)}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                onClick={handleSignup}
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
