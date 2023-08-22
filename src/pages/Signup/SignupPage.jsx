import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  Typography,
  Link,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleMaps from "../../components/GoogleMaps";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.config";
import {
  GridContainerStyled,
  GridStyled,
  OutlinedInputStyled,
  TitleStyled,
  TopicImageStyled,
  TopicImageGrid,
} from "./styles";

export default function SignupPage() {
  // Logic Part
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  return (
    <GridStyled container columnSpacing={2}>
      <Grid item xs={12} md={6}>
        <TitleStyled variant="h4" color="secondary">
          Welcome To Our Team
        </TitleStyled>
        <GridContainerStyled container rowGap={4}>
          <Grid container columnSpacing={3} rowGap={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Bamboo Restaurant"
                label="Restaurant Name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: Chinese"
                label="Restaurant Type"
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3} rowGap={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: yourname@gmail.com"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="input"
                placeholder="eg: +1 (111) 111 - 1111"
                label="Phone Number"
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <GoogleMaps />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3}>
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
          </Grid>
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <OutlinedInputStyled>
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornemnt-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </OutlinedInputStyled>
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
            <Grid item xs={12}>
              <Typography variant="subtitle1" onClick={() => navigate("/")}>
                Already a member? <Link>Click here to sign in</Link>
              </Typography>
            </Grid>
          </Grid>
        </GridContainerStyled>
      </Grid>
      <TopicImageGrid item xs={6}>
        <TopicImageStyled src="https://i.pinimg.com/564x/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.jpg" />
      </TopicImageGrid>
    </GridStyled>
  );
}
