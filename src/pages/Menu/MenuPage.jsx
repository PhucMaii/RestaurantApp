import { Fab, Grid, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddSectionModal from "../../components/Modals/AddSectionModal";
import ResponsiveDrawer from "../../components/Sidebar/Sidebar";
import CreateMenuPage from "../RestaurantCreation/CreateMenu/CreateMenuPage";
import { SectionStyled } from "./style";

export default function MenuPage() {
  const [currentSection, setCurrentSection] = useState("");
  // REPLACE THIS WITH ACTUAL DATA FROM FIRESTORE
  const [items, setItems] = useState([
    {
      availability: true,
      name: "Noodle Soup",
      price: 15.5,
      options: [
        {
          availability: true,
          name: "Rare Beef",
          price: 0,
        },
        {
          availability: true,
          name: "Brisket",
          price: 0,
        },
        {
          availability: true,
          name: "Meat Ball",
          price: 0,
        },
      ],
    },
    {
      availability: true,
      name: "Wonton Soup",
      price: 17.5,
      options: [
        {
          availability: true,
          name: "ADD-Wonton",
          price: 3,
        },
      ],
    },
    {
      availability: true,
      name: "Bun Bo Hue",
      price: 15.5,
      options: [
        {
          availability: true,
          name: "ADD-Rare Beef",
          price: 4,
        },
        {
          availability: true,
          name: "ADD-Brisket",
          price: 4,
        },
        {
          availability: true,
          name: "ADD-Meat Ball",
          price: 4,
        },
      ],
    },
  ]);
  const [newSectionName, setNewSectionName] = useState("");
  const [openAddSectionModal, setOpenAddSectionModal] = useState(false);
  const [openCreateMenuForm, setOpenCreateMenuForm] = useState(false);
  // REPLACE THIS WITH ACTUAL DATA FROM FIRESTORE
  const [sections, setSections] = useState([
    "Bar",
    "Grill",
    "Apetizer",
    "Soup",
  ]);

  const addSection = (section) => {
    const newSections = [...sections];
    newSections.push(section);
    setSections(newSections);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleChangeItems = (targetItem, field, value) => {
    const newItems = items.map((item) => {
      if (item.name === targetItem.name) {
        return { ...item, [field]: value };
      } else {
        return item;
      }
    });
    setItems(newItems);
  };

  const menu = (
    <>
      {openCreateMenuForm ? (
        <Grid container padding={2} rowGap={5}>
          <CreateMenuPage />
          <Button
            color="success"
            fullWidth
            onClick={() => setOpenCreateMenuForm(false)}
            variant="contained"
          >
            Finish
          </Button>
        </Grid>
      ) : (
        <>
          <AddSectionModal
            open={openAddSectionModal}
            handleClose={() => setOpenAddSectionModal(false)}
            sectionName={newSectionName}
            setSectionName={setNewSectionName}
            addSection={addSection}
          />
          <Grid container rowGap={2}>
            <Grid
              alignItems="center"
              container
              padding={1}
              sx={{ border: "2px solid black" }}
            >
              <Grid item xs={12} md={9}>
                <Grid container columnSpacing={5}>
                  {sections.map((section, index) => {
                    return (
                      <Grid item key={index}>
                        <SectionStyled
                          currentSection={currentSection == section}
                          padding={1}
                          onClick={() => setCurrentSection(section)}
                          variant="h5"
                        >
                          {section}
                        </SectionStyled>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid
                  alignItems="center"
                  justifyContent="right"
                  container
                  columnSpacing={2}
                >
                  <Grid item>
                    <Typography>Add Section</Typography>
                  </Grid>
                  <Grid item>
                    <Fab
                      color="primary"
                      onClick={() => setOpenAddSectionModal(true)}
                      size="small"
                    >
                      +
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={2}
              justifyContent="center"
              padding={2}
              rowGap={2}
            >
              {items.map((item, index) => {
                return (
                  <Grid key={index} item xs={12} md={5} xl={3}>
                    <ItemCard
                      deleteItem={() => deleteItem(index)}
                      item={item}
                      setItem={handleChangeItems}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container justifyContent="flex-end" padding={2}>
              <Grid item sx={{ position: "fixed", bottom: 10 }}>
                <Fab
                  color="primary"
                  onClick={() => setOpenCreateMenuForm(true)}
                  size="small"
                >
                  +
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
  return <ResponsiveDrawer tab={menu} />;
}
