import { Grid, TextField, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { GridContainerStyled } from './styles';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase.config';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleGetEmailToReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then((data) => {
        alert('Check your email');
      })
      .catch((err) => alert(err.code));
  };
  return (
    <GridContainerStyled container rowGap={3}>
      <Grid container justifyContent="center" rowGap={1}>
        <Grid container justifyContent="center">
          <Typography textAlign="center" variant="h4">
            Forgot Password ?
          </Typography>
        </Grid>
        <Grid container justifyContent="center">
          <Typography textAlign="center" color={grey[500]}>
            Don't worry. We will send you a link to reset it
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <TextField
          fullWidth
          type="input"
          placeholder="Enter your email..."
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid container justifyContent="center" rowGap={2}>
        <Button onClick={handleGetEmailToReset} fullWidth variant="contained">
          Get New Password
        </Button>
      </Grid>
    </GridContainerStyled>
  );
}
