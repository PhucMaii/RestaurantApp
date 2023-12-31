import {
  Alert,
  Fab,
  Grid,
  Typography,
  Snackbar,
  Skeleton,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddSectionModal from "../../components/Modals/AddSectionModal";
import ResponsiveDrawer from "../../components/Sidebar/Sidebar";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ReportIcon from '@mui/icons-material/Report';
import { SectionContainer, SectionStyled } from "./style";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { grey } from "@mui/material/colors";
import AddItemModal from "../../components/Modals/AddItemModal";
import { renderSkeleton } from "../../../utils/renderUtils";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ThemeContext } from "../../../Provider/ThemeContext";

export default function MenuPage() {
  const [currUser, _setCurrUser] = useLocalStorage('current-user', {});
  const [docId, setDocId] = useState("");
  const [menuData, setMenuData] = useState([]);
  // use for any changes inside EditItemModal, avoid updating action by action to firestore
  const [tempMenuData, setTempMenuData] = useState([]);
  const [currentSection, setCurrentSection] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    on: false,
    type: "info",
  });
  const [openAddSectionModal, setOpenAddSectionModal] = useState(false);
  const [openCreateMenuForm, setOpenCreateMenuForm] = useState(false);
  const [sections, setSections] = useState([]);
  const {isDarkTheme} = useContext(ThemeContext);
  const { t } = useTranslation();
  // Get Menu Doc Ref
  const menuCollection = collection(db, "menu");
  const restaurantRef = currUser.docId;
  const menuRef = query(
    menuCollection,
    where("restaurantRef", "==", `/users/${restaurantRef}`)
  );

  const addSection = useCallback(
    (section) => {
      const menu = [...menuData];
      menu.push({ name: section });
      const isSectionInvalid = sections.find((sec) => sec === section);
      if (!isSectionInvalid) {
        setMenuData(menu);
        setSections((prevSection) => [...prevSection, section]);
      } else {
        setNotification({
          message: "Section Name Is Existed",
          on: true,
          type: "error",
        });
      }
    },
    [menuData]
  );

  const deleteItem = useCallback(
    (index) => {
      const menu = [...menuData];
      menu[currentSection.index].items.splice(index, 1);
      setMenuData(menu);
    },
    [menuData]
  );

  const handleChangeItems = useCallback(
    (targetItem, field, value, isTemp) => {
      const menu = isTemp ? [...tempMenuData] : [...menuData];
      let items = menu[currentSection.index].items;
      const newItems = items.map((item) => {
        if (item.itemName === targetItem.itemName) {
          return { ...item, [field]: value };
        } else {
          return item;
        }
      });
      menu[currentSection.index].items = newItems;
      if (isTemp) {
        setTempMenuData(menu);
      } else {
        setMenuData(menu);
      }
    },
    [tempMenuData, menuData, currentSection]
  );

  const closeAddSectionModal = useCallback(() => {
    setOpenAddSectionModal(false);
  }, []);

  const handleCloseAddItemModal = useCallback(() => {
    setOpenCreateMenuForm(false);
    fetchMenu();
  }, []);

  const handleCloseNotification = () => {
    setNotification((prevNotification) => ({ ...prevNotification, on: false }));
  };

  const fetchMenu = async () => {
    try {
      setIsFetching(true);
      const querySnapshot = await getDocs(menuRef);
      if(querySnapshot.size > 0) {
        const newMenu = [];
        // Get the menu document belong to current user
        querySnapshot.forEach((doc) => {
          setDocId(doc.id);
          newMenu.push(...doc.data().sections);
        });
        const newSections = newMenu.map((section) => section.name);
        setMenuData(newMenu);
        setCurrentSection({ name: newMenu[0].name, index: 0 });
        setSections(newSections);
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const saveChanges = useCallback(() => {
    setMenuData(tempMenuData);
  }, [tempMenuData]);

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    const handleChangeDocument = async () => {
      if (menuData.length === 0) {
        return;
      }
      try {
        const docRef = doc(db, "menu", docId);
        await updateDoc(docRef, { sections: menuData });
      } catch (error) {
        if (error) {
          // Convert sections array to be an array of objects with the name is the section item
          const sectionNameList = sections.map((section) => {
            return { name: section };
          });
          const data = {
            sections: sectionNameList,
            restaurantRef: `/users/${restaurantRef}`,
          };
          const id = await addDoc(menuCollection, data);
          setDocId(id);
          window.location.reload();
        }
      }
    }
    handleChangeDocument();
    setTempMenuData(menuData);
  }, [menuData]);

  const menu = (
    <>
      <AddItemModal
        open={openCreateMenuForm}
        handleClose={handleCloseAddItemModal}
      />
      <AddSectionModal
        open={openAddSectionModal}
        handleClose={closeAddSectionModal}
        sectionName={newSectionName}
        setSectionName={setNewSectionName}
        addSection={addSection}
      />
      {isFetching ? (
        <Grid
          container
          columnSpacing={2}
          justifyContent="center"
          padding={3}
          rowGap={3}
        >
          <Grid item xs={12} textAlign="center">
            <Skeleton variant="rectangle" height={80} />
          </Grid>
          {renderSkeleton(6, 'rounded', 200, 5, 3)}
        </Grid>
      ) : menuData.length === 0 ? (
        <Grid
          container
          columnSpacing={2}
          justifyContent="center"
          padding={3}
          rowGap={3}
        >
          <Grid item xs={12} textAlign="center">
            <ReportIcon fontSize="large" color="error" />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography color={isDarkTheme ? 'secondary' : ''} fontWeight="bold" variant="h6">
              You Haven&apos;t Had A Menu Yet !!!
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography color={isDarkTheme ? 'secondary' : ''} fontWeight="bold" variant="h6">
              Let&apos;s Start With Creating Sections!
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Fab
              color="primary"
              size="medium"
              onClick={() => setOpenAddSectionModal(true)}
            >
              +
            </Fab>
          </Grid>
        </Grid>
      ) : (
        <>
          <Snackbar
            open={notification.on}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notification.type}
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>

          <Grid container rowGap={2}>
            <SectionContainer
              alignItems="center"
              container
              padding={1}
            >
              <Grid item xs={12} md={9}>
                <Grid container columnSpacing={5}>
                  {menuData.length > 0 && menuData.map((section, index) => {
                    return (
                      <Grid item key={index}>
                        <SectionStyled
                          $currsection={currentSection.name === section.name}
                          $isDarkTheme={isDarkTheme}
                          padding={1}
                          onClick={() => {
                            setCurrentSection({ name: section.name, index });
                          }}
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
                    <Typography color={isDarkTheme ? 'secondary' : ''}>{t("Add")} {t("section")}</Typography>
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
            </SectionContainer>
            <Grid
              container
              columnSpacing={2}
              justifyContent="center"
              padding={2}
              rowGap={2}
            >
              {menuData.length > 0 && menuData.map((section, index) => {
                if (currentSection.name === section.name) {
                  if (!section.items || section.items.length === 0) {
                    return (
                      <Grid
                        key={index}
                        alignItems="center"
                        container
                        justifyContent="center"
                        rowGap={2}
                      >
                        <Grid item textAlign="center" xs={12}>
                          <SearchOffIcon
                            fontSize="large"
                            sx={{ color: grey[500] }}
                          />
                        </Grid>
                        <Grid item textAlign="center" xs={12}>
                          <Typography
                            fontWeight="bold"
                            variant="h4"
                            color={isDarkTheme ? 'secondary' : grey[500]}
                          >
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
                          saveChanges={saveChanges}
                          setItem={handleChangeItems}
                        />
                      </Grid>
                    ));
                  }
                }
              })}
            </Grid>
            <Grid container justifyContent="flex-end" padding={2}>
              <Grid item sx={{ position: 'fixed', bottom: 10 }}>
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
