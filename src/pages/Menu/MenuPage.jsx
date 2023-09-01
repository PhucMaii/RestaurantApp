import { Fab, Grid, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddSectionModal from "../../components/Modals/AddSectionModal";
import ResponsiveDrawer from "../../components/Sidebar/Sidebar";
import CreateMenuPage from "../RestaurantCreation/CreateMenu/CreateMenuPage";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { SectionStyled } from "./style";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { grey } from "@mui/material/colors";

export default function MenuPage() {
  const [docId, setDocId] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [currentSection, setCurrentSection] = useState({});
  const [newSectionName, setNewSectionName] = useState("");
  const [openAddSectionModal, setOpenAddSectionModal] = useState(false);
  const [openCreateMenuForm, setOpenCreateMenuForm] = useState(false);

  // Get Menu Doc Ref
  const menuCollection = collection(db, "menu");
  const restaurantRef = JSON.parse(
    localStorage.getItem("current-user")
  ).docId;
  const menuRef = query(
    menuCollection,
    where("restaurantRef", "==", `/users/${restaurantRef}`)
  );

  const addSection = (section) => {
    const menu = [...menuData];
    menu.push({name: section});
    setMenuData(menu);
  };
  
  const deleteItem = (index) => {
    const menu = [...menuData];
    menu[currentSection.index].items.splice(index, 1);
    setMenuData(menu);
  };
  
  const handleChangeItems = (targetItem, field, value) => {
    const menu = [...menuData];
    let items = menu[currentSection.index].items;
    const newItems = items.map((item) => {
      if (item.itemName === targetItem.itemName) {
        return { ...item, [field]: value };
      } else {
        return item;
      }
    });
    menu[currentSection.index].items = newItems;
    setMenuData(menu)
  };
  
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const querySnapshot = await getDocs(menuRef);
        const newMenu = [];
        querySnapshot.forEach((doc) => {
          setDocId(doc.id);
          newMenu.push(...doc.data().sections);
        });
        setMenuData(newMenu);
        setCurrentSection({name: newMenu[0].name, index: 0})
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const handleChangeDocument = async () => {
      try {
        const docRef = doc(db, "menu", docId);
        await updateDoc(docRef, {sections: menuData});
      } catch(error) {
        console.log(error);
      }
    }
    handleChangeDocument();
  }, [menuData])
  
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
                  {menuData.map((section, index) => {
                    return (
                      <Grid item key={index}>
                        <SectionStyled
                          currentSection={currentSection.name == section.name}
                          padding={1}
                          onClick={() =>
                            setCurrentSection({ name: section.name, index })
                          }
                          variant="h5"
                        >
                          {section.name}
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
              {menuData.map((section, index) => {
                if (currentSection.name === section.name) {
                  if (!section.items) {
                    return (
                      <Grid
                        alignItems="center"
                        container
                        justifyContent="center"
                        rowGap={2}
                      >
                        <Grid item textAlign="center" xs={12}>
                          <SearchOffIcon fontSize="large" sx={{color: grey[500]}} />
                        </Grid>
                        <Grid item textAlign="center" xs={12}>
                          <Typography fontWeight="bold" variant="h4" sx={{color: grey[500]}}>
                            THIS SECTION IS EMPTY. LETS ADD SOME ITEMS INTO IT
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  } else {
                    return section.items.map((item, index) => (
                      <Grid key={index} item xs={12} md={5} xl={3}>
                        <ItemCard
                          deleteItem={() => deleteItem(index)}
                          item={item}
                          setItem={handleChangeItems}
                        />
                      </Grid>
                    ));
                  }
                }
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
