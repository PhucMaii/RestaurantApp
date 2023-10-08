import { 
  Alert, 
  Button, 
  CircularProgress, 
  Divider, 
  FormControl, 
  Grid, 
  IconButton, 
  InputAdornment, 
  InputLabel, 
  Link, 
  OutlinedInput, 
  Snackbar, 
  TextField, 
  Typography 
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ContainerGridStyled, LogoStyled } from '../styles'
import { createUserWithEmailAndPassword, getAdditionalUserInfo, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../../../../../firebase.config';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import useLocalStorage from '../../../../hooks/useLocalStorage';

export default function CustomerRegister() {
  const [customerData, setCustomerData] = useState({email: '', password: ''});
  const [_currentCustomer, setCurrentCustomer] = useLocalStorage('current-customer', {});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFieldsValid, setIsFieldsValid] = useState(false);
  const [notification, setNotification] = useState({
    on: false,
    type: 'error',
    message: ''
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const customerCollection = collection(db, 'customers');

  useEffect(() => {
    setIsFieldsValid(checkAllFieldsValid());
  }, [customerData, confirmPassword]);

  const checkAllFieldsValid = () => {
    return (
      customerData.email.trim() !== '' &&
      customerData.password.trim() !== '' &&
      confirmPassword.trim() !== ''
    )
  }
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailAndPasswordSignup = async () => {
    if(!isFieldsValid) {
      setNotification({
        on: true,
        type: 'error',
        message: 'Please fill out all blanks',
      })
      return;
    }
    if (customerData.password.length < 6) {
      setNotification({
        on: true,
        type: 'error',
        message: 'Password should be at least 6 characters',
      });
      return;
    }
    if(confirmPassword !== customerData.password) {
      setNotification({
        on: true,
        type: 'error',
        message: 'Confirm Password doesn not match',
      })
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, customerData.email, customerData.password);
      const user = userCredential.user;
      await sendEmailVerification(user); // haven't handle this yet
      const userData = {...customerData, provider: 'Email/Password Provider'};
      const userRef = await addDoc(customerCollection, userData);
      setCurrentCustomer({...userData, id: userRef._key.path.segments[1]})
      setNotification({
        on: true,
        type: 'success',
        message: 'Account Created Successfully'
      });
      // Wait for 1 second to load the page
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/customer/auth/signup/address");
      setIsLoading(false);
    } catch(error) {
      setIsLoading(false);
      setNotification({
        on: true,
        type: 'error',
        message: error.code
      });
      console.log(error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const userData = { email: user.email, provider: 'Google Provider' };
      if (getAdditionalUserInfo(userCredential).isNewUser) {
        const docRef = await addDoc(customerCollection, userData);
        setCurrentCustomer({ ...userData, id: docRef._key.path.segments[1] });
        navigate("/customer/auth/signup/address");
      } else {
        navigate('/customer/auth/signin');
      }
      // Wait for 1 second to load the page
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setNotification({
        on: true,
        type: 'error',
        message: error.code,
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShow) => !prevShow);
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prevShow) => !prevShow);
  }
  
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
        isLoading ?  (
          <Grid container justifyContent="center" alignItems="center" rowGap={3}>
            <Grid item textAlign="center" xs={12}>
              <CircularProgress />
            </Grid>
            <Grid item textAlign="center" xs={12}>
              <Typography variant="h4">Verification Link Is Sent</Typography>
            </Grid>
          </Grid>
          ) : (
          <ContainerGridStyled 
            alignItems="center"
            container 
            justifyContent="center" 
            rowGap={4}
            maxWidth={700}
            p={10}
          >
            <Grid item xs={12} textAlign="center">
              <Typography fontWeight="bold" variant="h4">Let&apos;s Create Your Account</Typography>
            </Grid>
            <Grid item xs={12} textAlign="center"> 
              <TextField 
                fullWidth
                label="Email"
                onChange={(e) => updateCustomerData('email', e.target.value)}
                placeholder="Enter your email..."
                value={customerData.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornemnt-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={customerData.password}
                  onChange={(e) => updateCustomerData('password', e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornemnt-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter your password..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </FormControl>
            </Grid>   
            <Grid item xs={12} textAlign="center" onClick={handleEmailAndPasswordSignup}>
              <Button fullWidth variant="contained">Continue</Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Divider><Typography variant="h6">Or</Typography></Divider>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                color="inherit"
                fullWidth
                onClick={handleGoogleSignup}
                variant="outlined"
              >
                <LogoStyled src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" />
                Continue With Google
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Already have an account? <Link onClick={() => navigate('/customer/auth/signin')}>Click here</Link> to sign in
              </Typography>
            </Grid>
          </ContainerGridStyled>
      )}
    </Grid>
  )
}
