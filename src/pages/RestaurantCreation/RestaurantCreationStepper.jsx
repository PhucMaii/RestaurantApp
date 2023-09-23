import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreateMenuPage from './CreateMenu/CreateMenuPage';
import CreateRestaurantPage from './CreateRestaurant/CreateRestaurantPage';
import CreateSectionPage from './CreateMenu/CreateSectionPage';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Restaurant Details',
  'Create Sections For Your Menu',
  'Add Food Items Into Your Menu',
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const navigate = useNavigate();

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      navigate('/home');
    }
  }, [activeStep]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        ''
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 ? (
              <CreateRestaurantPage goToNextStep={handleNext} />
            ) : activeStep === 1 ? (
              <CreateSectionPage goToNextStep={handleNext} />
            ) : (
              <CreateMenuPage />
            )}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} disabled={activeStep === 1}>
              Finish
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
