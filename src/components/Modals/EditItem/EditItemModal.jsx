import {
  Button,
  Divider,
  Fab,
  Grid,
  Modal,
  Typography,
  TextField,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import EditItemNameModal from "./EditItemNameModal";
import EditOptionModal from "./EditOptionModal";
import { formatToTwoDecimalPlace } from "../../../method/FormatNumber";
import AddOptionModal from "./AddOptionModal";
import { nonNumericCharacter } from "../../../utils/constant";

export default function EditItemModal({ deleteItem, item, handleClose, open, setItem }) {
  const [openAddOptionModal, setOpenAddOptionModal] = useState(false);
  const [openEditNameModal, setOpenEditNameModal] = useState(false);
  const [openEditOptionModal, setOpenEditOptionModal] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const addOption = (option) => {
    const newOptions = [...item.options];
    newOptions.push(option);
    setItem(item, "options", newOptions);
  };

  const handleChangeOption = (targetOption, field, value) => {
    const newOptions = item.options.map((option) => {
      if (option.name === targetOption.name) {
        return { ...option, [field]: value };
      } else {
        return option;
      }
    });
    setItem(item, "options", newOptions);
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
    setItem(item, "options", newOptions);
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
    setItem(item, "price", numericValue);
  };

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
      <Modal open={open} onClose={handleClose}>
        <Grid
          alignItems="center"
          container
          padding={2}
          rowGap={2}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "800px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          }}
        >
          <Grid item xs={6}>
            <Grid alignItems="center" container columnSpacing={2}>
              <Grid item>
                <Typography variant="h6">{item.name}</Typography>
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
            <Grid container justifyContent="right">
              <Grid item>
                <Button variant="contained" onClick={() => {deleteItem()}} color="error">
                  Delete This Item
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">Price</Typography>
            </Grid>
            <Grid item xs={6} textAlign="left">
              <TextField
                label="Price"
                onChange={handlePriceChange}
                value={`$${item.price}`}
                variant="standard"
              />
            </Grid>
          </Grid>
          {item.options.map((option, index) => (
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
                        onChange={(e) => {
                          handleChangeOption(
                            option,
                            "availability",
                            !option.availability
                          );
                        }}
                        checked={option.availability}
                      />
                      Availability
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
              Add option{" "}
              <Fab onClick={handleOpenAddOptionModal} size="small">
                +
              </Fab>
            </Typography>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
