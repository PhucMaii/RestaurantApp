import React, { useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  InputAdornment,
  IconButton,
  Link,
  Typography,
  TextField,
  OutlinedInput,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ContainerGridStyled, LogoStyled } from './styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db, googleProvider } from '../../../../../firebase.config';
import {
  getAdditionalUserInfo,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router';

export default function CustomerSigninPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    on: false,
    type: 'error',
    message: '',
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [_currCustomer, setCurrCustomer] = useLocalStorage(
    'current-customer',
    {},
  );
  const userCollection = collection(db, 'customers');
  const userQuery = query(userCollection, where('email', '==', email));

  const handleClickShowPassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleLoginWithEmailAndPassword = async () => {
    setIsLoading({
      on: true,
      message: "You are being directed to Home Page"
    });
    try {
      let userId;
      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach((doc) => {
        userId = doc.id;
      });
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      if(!userCredentials.user.emailVerified) {
        setNotification({
          on: true,
          type: 'error',
          message: 'Email Is Not Verified',
          hasButton: true
        })
        setUser(userCredentials.user);
        setIsLoading(false);
        return;

      }
      setCurrCustomer({ email, password, userId });
      navigate('/customer/home');
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

  const handleGoogleLogin = async () => {
    setIsLoading({
      on: true,
      message: "You are being directed to Home Page"
    });
    try {
      let userId;
      const userCredential = await signInWithPopup(auth, googleProvider);
      const googleQuery = query(userCollection, where('email', '==', userCredential.user.email));
      if (getAdditionalUserInfo(userCredential).isNewUser) {
        navigate('/customer/auth/signup/address');
      } else {
        const querySnapshot = await getDocs(googleQuery);
        querySnapshot.forEach((doc) => {
          userId = doc.id;
        });
        setCurrCustomer({ email: userCredential.user.email, userId });
        navigate('/customer/home');
      }
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

  const handleResendVerificationEmail = async () => {
    setIsLoading({
      on: true,
      message: "Verification Email Is Being Sent"
    });
    try {
      await sendEmailVerification(user);
      setIsLoading(false);
      setNotification({
        on: true,
        type: 'success',
        message: 'Verification Email Is Sent. Please Check It Out'
      })
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <Grid
      alignItems="center"
      container
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      {isLoading.on ? (
        <Grid container justifyContent="center" alignItems="center" rowGap={3}>
          <Grid item textAlign="center" xs={12}>
            <CircularProgress />
          </Grid>
          <Grid item textAlign="center" xs={12}>
            <Typography variant="h4">{isLoading.message}</Typography>
          </Grid>
        </Grid>
      ) : (
        <ContainerGridStyled
          container
          rowGap={3}
          maxWidth={600}
          justifyContent="center"
          p={10}
        >
          <Grid item xs={12} textAlign="center">
            <Typography fontWeight="bold" variant="h4">
              Sign In To Your Account
            </Typography>
          </Grid>
          {
            notification.on && (
            <Grid item xs={12}>
              <Alert severity={notification.type}>
                {notification.message}. 
                {notification.hasButton && <Link onClick={handleResendVerificationEmail} size="small" variant="standard"> Click here to resend verification email </Link>}
              </Alert>  
            </Grid>
            )
          }
          <Grid item xs={12} textAlign="center">
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={handleLoginWithEmailAndPassword}
                variant="contained"
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" textAlign="right">
                <Link>
                  Forgot Password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography style={{ color: grey[500] }} variant="subtitl1">
              <Divider>or</Divider>
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              color="inherit"
              fullWidth
              onClick={handleGoogleLogin}
              variant="outlined"
            >
              <LogoStyled src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" />
              Continue With Google
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="right">
            <Typography variant="subtitle2" textAlign="right">
              Not a member yet? <Link onClick={() => navigate('/customer/auth/signup')}> Click here</Link> to sign up
            </Typography>
          </Grid>
        </ContainerGridStyled>
      )}
    </Grid>
  );
}
