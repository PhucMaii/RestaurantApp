import React, { memo, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Divider,
  Fab,
  Grid,
  Typography,
  TextField,
  Switch,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from 'prop-types';
import EditItemNameModal from "./EditItemNameModal";
import EditOptionModal from "./EditOptionModal";
import { formatToTwoDecimalPlace } from "../../../utils/number";
import AddOptionModal from "./AddOptionModal";
import { nonNumericCharacter } from "../../../utils/constant";
import { GridModal, ModalStyled } from "../style";
import useUploadFile from "../../../../hooks/useUploadFile";
import { ThemeContext } from "../../../../Provider/ThemeContext";

function EditItemModal({
  deleteItem,
  item,
  handleClose,
  open,
  saveChanges,
  setItem,
}) {
  const [openAddOptionModal, setOpenAddOptionModal] = useState(false);
  const [openEditNameModal, setOpenEditNameModal] = useState(false);
  const [openEditOptionModal, setOpenEditOptionModal] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const { isDarkTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const {
    allowUploadImage,
    allowUploadImageURL,
    imageFile,
    imageProgress,
    handleFileInputChange,
    setImageURL,
  } = useUploadFile(item.itemImageURL, updateItemImageURL);

  const addOption = (option) => {
    const newOptions = [...item.options];
    newOptions.push(option);
    setItem(item, "options", newOptions, true);
  };

  const handleChangeOption = (targetOption, field, value) => {
    const newOptions = item.options.map((option) => {
      if (option.name === targetOption.name) {
        return { ...option, [field]: value };
      } else {
        return option;
      }
    });
    setItem(item, "options", newOptions, true);
  };

  const handleCloseAddOptionModal = () => {
    setOpenAddOptionModal(false);
  };

  const handleCloseEditNameModal = () => {
    setOpenEditNameModal(false);
  };

  const handleCloseEditOptionModal = () => {
    setSelectedOptionIndex(null);
    setOpenEditOptionModal(false);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...item.options];
    newOptions.splice(index, 1);
    setItem(item, "options", newOptions, true);
  };

  const handleOpenAddOptionModal = () => {
    setOpenAddOptionModal(true);
  };

  const handleOpenEditNameModal = () => {
    setOpenEditNameModal(true);
  };

  const handleOpenEditOptionModal = (index) => {
    setSelectedOptionIndex(index);
    setOpenEditOptionModal(true);
  };

  const handlePriceChange = (e) => {
    // Remove non-numeric character
    const numericValue = e.target.value.replace(nonNumericCharacter, "");
    setItem(item, "itemPrice", +numericValue, true);
  };

  function updateItemImageURL(url) {
    setItem(item, "itemImageURL", url, true);
  }

  return (
    <>
      <AddOptionModal
        open={openAddOptionModal}
        handleClose={handleCloseAddOptionModal}
        addOption={addOption}
      />
      <EditItemNameModal
        item={item}
        handleClose={handleCloseEditNameModal}
        open={openEditNameModal}
        setItem={setItem}
      />
      <ModalStyled style={{overflowY: 'auto'}} open={open} onClose={handleClose}>
        <GridModal
          maxWidth="800px"
          alignItems="center"
          container
          padding={2}
          rowGap={2}
          $isDarkTheme={isDarkTheme}
          style={{overflowY: 'auto'}}
        >
          <Grid item xs={6}>
            <Grid alignItems="center" container columnSpacing={2}>
              <Grid item>
                <Typography variant="h6">{item.itemName}</Typography>
              </Grid>
              <Grid item>
                <Fab
                  color="primary"
                  onClick={handleOpenEditNameModal}
                  size="small"
                >
                  <EditIcon size="small" />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid columnSpacing={2} container justifyContent="right">
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    deleteItem();
                  }}
                  color="error"
                >
                  {t("Delete This Item")}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClose();
                    saveChanges();
                  }}
                >
                  {t("Save Changes")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">{t("Price")}</Typography>
            </Grid>
            <Grid item xs={6} textAlign="left">
              <TextField
                label={t("Price")}
                onChange={handlePriceChange}
                value={`$${item.itemPrice}`}
                variant={isDarkTheme ? "outlined" : "standard"}
              />
            </Grid>
          </Grid>
          {item.options.length > 0 && item.options.map((option, index) => (
            <React.Fragment key={index}>
              <EditOptionModal
                handleClose={handleCloseEditOptionModal}
                open={selectedOptionIndex === index && openEditOptionModal}
                option={option}
                setOption={handleChangeOption}
              />
              <Grid item xs={6}>
                <Grid container alignItems="center" columnSpacing={2}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      <Switch
                        onChange={() => {
                          handleChangeOption(
                            option,
                            "availability",
                            !option.availability
                          );
                        }}
                        checked={option.availability}
                      />
                      {t("Availability")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{option.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  alignItems="center"
                  container
                  columnSpacing={2}
                  justifyContent="right"
                >
                  <Grid item>${formatToTwoDecimalPlace(option.price)}</Grid>
                  <Grid item>
                    <Fab
                      color="primary"
                      onClick={() => handleOpenEditOptionModal(index)}
                      size="small"
                    >
                      <EditIcon />
                    </Fab>
                  </Grid>
                  <Grid item>
                    <Fab
                      color="error"
                      onClick={() => handleDeleteOption(index)}
                      size="small"
                    >
                      <DeleteIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12} textAlign="right">
            <Typography variant="subtitle1">
              {t("Add")} {t("option")}
              <Fab onClick={handleOpenAddOptionModal} size="small">
                +
              </Fab>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("Item's Description")}
              multiline
              value={item.itemDescription}
              onChange={(e) => {
                setItem(item, "itemDescription", e.target.value, true);
              }}
              variant="outlined"
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight="bold" variant="h6">
              {t("Edit")} {t("Item Image URL")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!allowUploadImageURL}
              fullWidth
              label={t("Item Image URL")}
              value={item.itemImageURL}
              onChange={(e) => {
                setItem(item, "itemImageURL", e.target.value, true);
                setImageURL(e.target.value);
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>{t("Or")}</Divider>
          </Grid>
          <Grid item xs={12}>
            <input
              disabled={!allowUploadImage}
              accept="image/*"
              style={{ display: "none" }}
              id="outlined-button-file"
              type="file"
              onChange={handleFileInputChange}
            />
            <label htmlFor="outlined-button-file">
              <Button
                disabled={!allowUploadImage}
                fullWidth
                variant="outlined"
                component="span"
              >
                {t("Upload")}
              </Button>
            </label>
          </Grid>
          {imageProgress !== null && (
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={imageProgress} />
              <Typography fontWeight="bold" textAlign="left">
                URL: {imageFile}
              </Typography>
            </Grid>
          )}
        </GridModal>
      </ModalStyled>
    </>
  );
}

EditItemModal.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  saveChanges: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
}

export default memo(EditItemModal)