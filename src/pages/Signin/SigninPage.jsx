import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  Typography,
  Divider,
  Link,
  Grid,
  Alert,
  TextField,
  Button,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db, googleProvider } from '../../../firebase.config';
import {
  GridStyled,
  LogoStyled,
  OutlinedInputStyled,
  TitleStyled,
  TopicImageStyled,
  InputGrid,
  TopicImageGrid,
} from './styles';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default function SigninPage() {
  // Hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isXLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const userCollection = collection(db, 'users');

  const handleEmailAndPasswordLogin = async () => {
    if (password.length < 6) {
      setNotification({
        on: true,
        type: 'error',
        message: 'Password should be at least 6 characters',
      });
      return;
    }
    const userData = { email, password, provider: 'Email/Password Provider' };
    try {
      setIsLoading(true);
      let userID, hasRestaurant;
      const user = query(userCollection, where('email', '==', email));
      const querySnapshot = await getDocs(user);
      querySnapshot.forEach((doc) => {
        userID = doc.id;
        hasRestaurant = doc.data().hasRestaurant;
      });
      await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      localStorage.setItem(
        'current-user',
        JSON.stringify({ ...userData, hasRestaurant, docId: userID }),
      );
      navigate('/home');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        setIsLoading(true);
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const data = { ...userData, hasRestaurant: false };
        const docRef = await addDoc(userCollection, data);
        localStorage.setItem(
          'current-user',
          JSON.stringify({ ...data, docId: docRef._key.path.segments[1] }),
        );
        navigate('/create-restaurant');
        setIsLoading(false);
      } else {
        setNotification({
          on: true,
          type: 'error',
          message: error.code,
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const userData = { email: user.email, provider: 'Google Provider' };
      if (getAdditionalUserInfo(userCredential).isNewUser) {
        const data = { ...userData, hasRestaurant: false };
        const docRef = await addDoc(userCollection, data);
        localStorage.setItem(
          'current-user',
          JSON.stringify({ ...data, docId: docRef._key.path.segments[1] }),
        );
        navigate('/create-restaurant');
      } else {
        let userID, hasRestaurant;
        const userSnapShot = query(
          userCollection,
          where('email', '==', user.email),
        );
        const querySnapshot = await getDocs(userSnapShot);
        querySnapshot.forEach((doc) => {
          userID = doc.id;
          hasRestaurant = doc.data().hasRestaurant;
        });
        localStorage.setItem(
          'current-user',
          JSON.stringify({ ...userData, hasRestaurant, docId: userID }),
        );
        navigate('/home');
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

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <GridStyled container columnSpacing={5}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <InputGrid container rowGap={isXLargeScreen ? 8 : 3}>
              <Grid item xs={12}>
                <TitleStyled
                  variant={isSmallScreen ? 'h4' : 'h3'}
                  color="secondary"
                >
                  Welcome Back
                </TitleStyled>
              </Grid>
              {notification.on && (
                <Grid item xs={12}>
                  <Alert severity={notification.type}>
                    {notification.message}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="input"
                  placeholder="Enter your email..."
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <OutlinedInputStyled>
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
                </OutlinedInputStyled>
              </Grid>
              <Grid container rowGap={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleEmailAndPasswordLogin}
                >
                  REGISTER
                </Button>
                <Typography variant="subtitle2">
                  <Link onClick={() => navigate('/forgot-password')}>
                    Forgot Password ?
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  onClick={handleGoogleLogin}
                  variant="contained"
                  color="inherit"
                >
                  <LogoStyled src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" />
                  Continue With Google
                </Button>
              </Grid>
            </InputGrid>
          </Grid>
          <TopicImageGrid item xs={12} sm={6}>
            <TopicImageStyled src="https://i.pinimg.com/564x/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.jpg" />
          </TopicImageGrid>
        </>
      )}
    </GridStyled>
  );
}
