import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Alert } from '@mui/material';
import { MenuImage, HelperTextStyled } from './styles';
import MultipleValueTextField from '../../../components/MultipleValueTextField';
import { db } from '../../../../firebase.config';
import {
  addDoc,
  collection,
} from 'firebase/firestore';

export default function CreateSectionPage({ goToNextStep }) {
  const [currSection, setCurrSection] = useState('');
  const [sections, setSections] = useState([]);
  const [notification, setNotification] = useState({});

  const handleAddSections = async () => {
    if(sections.length === 0) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'You need to add at least 1 section'
      });
      return;
    }
    try {
      const menuCollection = collection(db, 'menu');
      const restaurantRef = JSON.parse(
        localStorage.getItem('current-user'),
      ).docId;
      // Convert sections array to be an array of objects with the name is the section item
      const sectionNameList = sections.map((section) => {
        return { name: section };
      });
      const data = {
        sections: sectionNameList,
        restaurantRef: `/users/${restaurantRef}`,
      };
      await addDoc(menuCollection, data);
      goToNextStep();
    } catch (error) {
      setNotification({
        on: true,
        severity: 'error',
        message: error.code,
      });
    }
  };

  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid container justifyContent="center">
        <MenuImage src="https://www.pngitem.com/pimgs/m/133-1331604_menu-text-menu-text-png-transparent-png.png" />
      </Grid>
      <Grid container justifyContent="center">
        <Typography textAlign="center" variant="h3" color="secondary">
          Let&apos;s get started with your menu
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <HelperTextStyled variant="h6" textAlign="center">
          Create a section. It will help you to divide separate sections in your
          restaurants. Therefore, it provides to you the convenience whenever
          you need to manage it. Press Enter To Add Each Section.
        </HelperTextStyled>
      </Grid>
      {notification.on && (
        <Alert severity={notification.severity}>{notification.message}</Alert>
      )}
      <MultipleValueTextField
        currValue={currSection}
        setCurrValue={setCurrSection}
        values={sections}
        setValues={setSections}
        labelName="Section's Name"
        variant="filled"
        width="50%"
        chipWidth={6}
      />
      <Button
        onClick={handleAddSections}
        sx={{ width: '50%' }}
        variant="contained"
      >
        Add
      </Button>
    </Grid>
  );
}

CreateSectionPage.propTypes = {
  goToNextStep: PropTypes.func.isRequired
}