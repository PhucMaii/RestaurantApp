import React, { useState } from "react";
import { Grid, Typography, Button, Alert } from "@mui/material";
import { MenuImage, HelperTextStyled } from "./styles";
import MultipleValueTextField from "../../../components/MultipleValueTextField";
import { db } from "../../../../firebase.config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export default function CreateSectionPage() {
  const [currSection, setCurrSection] = useState("");
  const [sections, setSections] = useState([]);
  const [notification, setNotification] = useState({});

  const handleAddSections = async () => {
    try {
      const menuCollection = collection(db, "menu");
      const restaurantRef = JSON.parse(localStorage.getItem("current-user"));
      // Convert sections array to be an array of objects with the name is the section item
      const sectionNameList = sections.map((section) => {
        return { name: section };
      });
      const data = {
        sections: sectionNameList,
        restaurantRef: `/users/${restaurantRef.id}`,
      };
      const menu = query(
        menuCollection,
        where("restaurantRef", "==", `/users/${restaurantRef.id}`)
      );
      const querySnapshot = await getDocs(menu);

      // if the menu hasn't created yet, then create one and add data
      // otherwise update it
      if (querySnapshot.empty) {
        await addDoc(menuCollection, data);
      } else {
        querySnapshot.forEach(async (doc) => {
          const menuDocRef = doc.ref;
          await updateDoc(menuDocRef, {
            // arrayUnion helps to merge new data into the firestore
            sections: arrayUnion(...sectionNameList),
          });
        });
      }
      setNotification({
        on: true,
        severity: "success",
        message: `You added ${
          sections.length > 2 ? sections.slice(0, 2) + "..." : sections
        } successfully. Press Next if you are done with creating sections`,
      });
      setSections([]);
    } catch (error) {
      setNotification({
        on: true,
        severity: "error",
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
          Let's get started with your menu
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
        <Alert severity={notification.type}>{notification.message}</Alert>
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
        sx={{ width: "50%" }}
        variant="contained"
      >
        Add
      </Button>
    </Grid>
  );
}
