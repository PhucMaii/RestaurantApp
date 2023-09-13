import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider, LinearProgress, Grid, TextField, Button, Alert, Typography } from '@mui/material';
import GoogleMaps from '../../../components/GoogleMaps';
import { db } from '../../../../firebase.config';
import {
  GridContainerStyled,
  GridStyled,
  TopicImageStyled,
} from './styles';
import { doc, updateDoc } from 'firebase/firestore';
import useUploadFile from '../../../hooks/useUploadFile';

export default function CreateRestaurant({ goToNextStep }) {
  const [restaurantData, setRestaurantData] = useState({
    restaurantName: "",
    restaurantType: "",
    restaurantPhoneNumber: "",
    restaurantAddress: "",
    preparingTime: 600
  });
  const [fieldsValid, setFieldsValid] = useState(true);
  const [notifications, setNotifications] = useState({});
  const [receivedAdress, setReceivedAddress] = useState(null);

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
      const userAuthData = JSON.parse(localStorage.getItem('current-user'));
      userAuthData.hasRestaurant = true;
      const documentRef = doc(db, 'users', userAuthData.docId);
      const data = { ...userAuthData, ...restaurantData };
      await updateDoc(documentRef, data);
      localStorage.setItem('current-user', JSON.stringify(userAuthData));
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
      <Grid item xs={6}>
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
              label="Item's Image URL"
              placeholder="Enter Item's Image URL..."
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
      <Grid item xs={6}>
        <TopicImageStyled src="https://i.pinimg.com/564x/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.jpg" />
      </Grid>
    </GridStyled>
  );
}

CreateRestaurant.propTypes = {
  goToNextStep: PropTypes.func.isRequired
}