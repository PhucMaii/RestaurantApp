import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../../firebase.config";
import {
  GridStyled,
  LogoStyled,
  OutlinedInputStyled,
  TitleStyled,
  TopicImageStyled,
  InputGrid,
  TopicImageGrid,
} from "./styles";

export default function SigninPage() {
  // Hooks
  const [email, setEmail] = useState("");
  const [isAuth, setIsAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isXLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("xl"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const handleEmailAndPasswordLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Sign in successfully");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        navigate("/create-restaurant");
      } else {
        console.log(error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (getAdditionalUserInfo(result).isNewUser) {
        navigate("/create-restaurant");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  
  return (
    <GridStyled container columnSpacing={5}>
      <Grid item xs={12} sm={6}>
        <InputGrid container rowGap={isXLargeScreen ? 8 : 3}>
          <Grid item xs={12}>
            <TitleStyled
              variant={isSmallScreen ? "h4" : "h3"}
              color="secondary"
            >
              Welcome Back
            </TitleStyled>
          </Grid>
          {!isAuth && (
            <Grid item xs={12}>
              <Alert fullWidth severity="error">
                Your email or password is not found
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
                type={showPassword ? "text" : "password"}
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
              <Link>Forgot Password ?</Link>
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
    </GridStyled>
  );
}
