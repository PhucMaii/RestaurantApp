import React from 'react';
import { Box, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/base';

export default function OrderStatusPage() {
    const steps = [
        'Received',
        'Preparing (Be ready to pick up)',
        'Ready',
    ];

    return (
        <Grid container mt={2} rowGap={4}>
            <Grid container>
                <Grid item xs={2}>
                    <Button><ArrowBackIcon /></Button>
                </Grid>
                <Grid item textAlign="left" xs={8}>
                    <Typography fontWeight="bold" textAlign="center" variant="h5">Order Status</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography fontWeight="bold" textAlign="center" variant="h6">Order Details</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
