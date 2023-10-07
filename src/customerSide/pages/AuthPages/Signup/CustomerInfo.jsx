import { Alert, Button, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ContainerGridStyled } from '../styles'
import GoogleMaps from '../../../../restaurantSide/components/GoogleMaps'
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase.config';

export default function CustomerInfo() {
  const [customerData, setCustomerData] = useState({
    name: '',
    address: ''
  })
  const [isFieldsValid, setIsFieldsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    on: false,
    type: 'error',
    message: ''
  });
  const [receivedAddress, setReceivedAddress] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useLocalStorage('current-customer', {});
  const customerDocRef = doc(db, 'customers', currentCustomer.id);

  useEffect(() => {
    if(receivedAddress) {
      updateCustomerData('address', receivedAddress.description)
    }
  }, [receivedAddress])

  useEffect(() => {
    setIsFieldsValid(checkAllFieldsValid());
  }, [customerData])

  const checkAllFieldsValid = () => {
    return (
      customerData.name.trim() !== '' &&
      customerData.address.trim() !== ''
    )
  }

  const signup = async () => {
    setIsLoading(true);
    if(!isFieldsValid) {
      setNotification({
        on: true,
        type: 'error',
        message: 'Please fill out all blanks'
      })
      return;
    }
    try {
      await updateDoc(customerDocRef, customerData);
      setCurrentCustomer({...currentCustomer, ...customerData});
      // Navigate to Sign in Page, instead of this notification
      setNotification({
        on: true,
        type: 'success',
        message: 'Sign up Successfully'
      })
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch(error) {
      setNotification({
        on: true,
        type: 'error',
        message: error.code
      })
    }
  }

  const handleReceiveAddress = (data) => {
      setReceivedAddress(data);
  };

  const updateCustomerData = (field, value) => {
    setCustomerData(prevData => ({...prevData, [field]: value}));
  }
    
  return (
    <Grid       
      alignItems="center" 
      container 
      justifyContent="center" 
      style={{ minHeight: '100vh' }}
    >
      <Snackbar 
        open={notification.on}
        autoHideDuration={60}
      >
        <Alert severity={notification.type}>{notification.message}</Alert>
      </Snackbar>
      {
        isLoading ? ( 
          <Grid container justifyContent="center" alignItems="center" rowGap={3}>
            <Grid item textAlign="center" xs={12}>
              <CircularProgress />
            </Grid>
            <Grid item textAlign="center" xs={12}>
              <Typography variant="h4">You be directed to Login Page </Typography>
            </Grid>
          </Grid>) : (
            <ContainerGridStyled 
              alignItems="center"
              container 
              justifyContent="center" 
              rowGap={4}
              maxWidth={700}
              p={10}
            >
              <Grid item xs={12} textAlign="center">
                <Typography fontWeight="bold" variant="h4">Last Step</Typography>
              </Grid>
              <Grid item xs={12}>
                <Alert severity='warning'>Please Verify Your Email After This</Alert>
              </Grid>
              <Grid item xs={12} textAlign="center"> 
                <TextField 
                  fullWidth
                  label="Name"
                  onChange={(e) => updateCustomerData('name', e.target.value)}
                  placeholder="Enter your name..."
                  value={customerData.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} textAlign="center"> 
                <GoogleMaps onDataReceived={handleReceiveAddress}/>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button fullWidth onClick={signup} variant="contained">Sign up</Button>
              </Grid>
            </ContainerGridStyled>
          )
      }
    </Grid>
  )
}
