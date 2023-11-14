import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider, LinearProgress, Grid, TextField, Button, Alert, Typography } from '@mui/material';
import GoogleMaps from '../../../components/GoogleMaps';
import { db } from '../../../../../firebase.config';
import {
  GridContainerStyled,
  GridStyled,
  TopicImageStyled,
  TopicImageGrid
} from './styles';
import { doc, updateDoc } from 'firebase/firestore';
import useUploadFile from '../../../../hooks/useUploadFile';
import useLocalStorage from '../../../../hooks/useLocalStorage';

export default function CreateRestaurant({ goToNextStep }) {
  const [restaurantData, setRestaurantData] = useState({
    imageLink: "",
    restaurantName: "",
    restaurantType: "",
    restaurantPhoneNumber: "",
    restaurantAddress: "",
    preparingTime: 600
  });
  const [fieldsValid, setFieldsValid] = useState(true);
  const [notifications, setNotifications] = useState({});
  const [receivedAdress, setReceivedAddress] = useState(null);
  const [currUser, setCurrUser] = useLocalStorage('current-user', {});

  const {
    allowUploadImage,
    allowUploadImageURL,
    imageFile,
    imageURL,
    imageProgress,
    handleFileInputChange,
    setImageURL
  } = useUploadFile('', updateRestaurantImageLink);

  const isRestaurantDataValid = () => {
    return (
      restaurantData.restaurantName.trim() !== '' &&
      restaurantData.restaurantType.trim() !== '' &&
      restaurantData.imageLink.trim() !== '' &&
      /^\d{10}$/.test(restaurantData.restaurantPhoneNumber)
    );
  };

  useEffect(() => {
    if (receivedAdress) {
      setRestaurantData({
        ...restaurantData,
        restaurantAddress: receivedAdress.description,
      });
    } else {
      setFieldsValid(false);
    }
  }, [receivedAdress]);

  useEffect(() => {
    setFieldsValid(isRestaurantDataValid());
  }, [restaurantData]);

  const handleReceiveAddress = (data) => {
    setReceivedAddress(data);
  };

  const handleTextFieldChange = (field, value) => {
    setRestaurantData({
      ...restaurantData,
      [field]: value,
    });
  };

  const handleCreateRestaurant = async () => {
    if (!fieldsValid) {
      setNotifications({
        on: true,
        type: 'error',
        message: 'Input Field is not valid',
      });
      return;
    }
    try {
      const currUserData = {...currUser, hasRestaurant: true}
      setCurrUser(currUserData)
      const documentRef = doc(db, 'users', currUser.docId);
      const data = { ...currUserData, ...restaurantData };
      await updateDoc(documentRef, data);
      setNotifications({
        on: true,
        type: 'success',
        message:
          'Congratulations! You Created Your Own Restaurant Successfully',
      });
      goToNextStep();
    } catch (error) {
      setNotifications({
        on: true,
        type: 'error',
        message: error.code,
      });
    }
  };

  function updateRestaurantImageLink(url) {
    handleTextFieldChange('imageLink', url)
  }

  return (
    <GridStyled container columnSpacing={2}>
      <Grid item xs={12} sm={6}>
        <Grid item>
          <Typography
            marginBottom={2}
            color="secondary"
            fontWeight="bold"
            textAlign="center"
            variant="h3"
          >
            Account creation successful! Now, let&apos;s input your restaurant
            details.
          </Typography>
          {notifications.on && (
            <Alert severity={notifications.type}>{notifications.message}</Alert>
          )}
        </Grid>
        <GridContainerStyled container rowGap={4}>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Bamboo Restaurant"
                label="Restaurant Name"
                value={restaurantData.restaurantName || ''}
                onChange={(e) => {
                  handleTextFieldChange('restaurantName', e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Chinese"
                label="Restaurant Type"
                value={restaurantData.restaurantType || ''}
                onChange={(e) => {
                  handleTextFieldChange('restaurantType', e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="input"
                placeholder="Enter 10 numbers for your phone number"
                label="Phone Number"
                value={restaurantData.restaurantPhoneNumber || ''}
                onChange={(e) => {
                  handleTextFieldChange(
                    'restaurantPhoneNumber',
                    e.target.value.trim(),
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <GoogleMaps onDataReceived={handleReceiveAddress} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!allowUploadImageURL}
              fullWidth
              variant="outlined"
              value={imageURL}
              onChange={(e) => {
                const newImageURL = e.target.value;
                setImageURL(newImageURL);
                handleTextFieldChange("imageLink", newImageURL)
              }}
              label="Restaurant's Image URL"
              placeholder="Enter Restaurant's Image URL..."
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography>Or</Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <input
              disabled={!allowUploadImage}
              accept="image/*"
              style={{ display: 'none' }}
              id="outlined-button-file"
              type="file"
              onChange={handleFileInputChange}
            />
            <label htmlFor="outlined-button-file">
              <Button
                disabled={!allowUploadImage}
                fullWidth
                variant="outlined"
                component="span"
              >
                Upload
              </Button>
            </label>
          </Grid>
          {imageProgress !== null && (
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={imageProgress} />
              <Typography fontWeight="bold" textAlign="left">
                URL: {imageFile}
              </Typography>
            </Grid>
          )}
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
      <TopicImageGrid item sm={6}>
        <TopicImageStyled src="https://images.unsplash.com/photo-1623123095585-bfa830e3f8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" />
      </TopicImageGrid>
    </GridStyled>
  );
}

CreateRestaurant.propTypes = {
  goToNextStep: PropTypes.func.isRequired
}