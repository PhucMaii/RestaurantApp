import React, { useContext, useEffect, useState } from 'react';
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
import { auth, db, googleProvider } from '../../../../firebase.config';
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
import useLocalStorage from '../../../hooks/useLocalStorage';
import { ThemeContext } from '../../Provider/ThemeContext';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleDarkTheme } = useContext(ThemeContext);
  const [_currUser, setCurrUser] = useLocalStorage('current-user', {});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const userCollection = collection(db, 'users');

  // Reset the theme
  useEffect(() => {
    toggleDarkTheme(false);
  }, [])

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
      await signInWithEmailAndPassword(auth, email, password);
      setCurrUser({ ...userData, hasRestaurant, docId: userID });
      // Wait for 1 second to load the page
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/home');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        setIsLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        const data = {
          ...userData,
          hasRestaurant: false,
        };
        const docRef = await addDoc(userCollection, data);
        setCurrUser({ ...data, docId: docRef._key.path.segments[1] });
        // Wait for 1 second to load the page
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
        const data = {
          ...userData,
          hasRestaurant: false
        };
        const docRef = await addDoc(userCollection, data);
        setCurrUser({ ...data, docId: docRef._key.path.segments[1] });
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
        setCurrUser({ ...userData, hasRestaurant, docId: userID });
        navigate('/home');
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
    setShowPassword((show) => !show);
  };

  return (
    <GridStyled container columnSpacing={5}>
      {isLoading ? (
        <Grid container justifyContent="center" alignItems="center" rowGap={3}>
          <Grid item textAlign="center" xs={12}>
            <CircularProgress />
          </Grid>
          <Grid item textAlign="center" xs={12}>
            <Typography variant="h4">Loading...</Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <InputGrid container rowGap={3}>
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
            <TopicImageStyled src="https://images.unsplash.com/photo-1623123095585-bfa830e3f8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" />
          </TopicImageGrid>
        </>
      )}
    </GridStyled>
  );
}
