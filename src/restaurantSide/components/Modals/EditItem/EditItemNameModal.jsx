import { Button, Grid, TextField } from '@mui/material';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { GridModal, ModalStyled } from '../style';
import { ThemeContext } from '../../../../Provider/ThemeContext';

function EditItemNameModal({ item, handleClose, open, setItem }) {
  const {isDarkTheme} = useContext(ThemeContext);
  const { t } = useTranslation();
  
  const handleChangeName = (e) => {
    setItem(item, "itemName", e.target.value, true);
  };

  return (
    <ModalStyled open={open} onClose={handleClose}>
      <GridModal
        maxWidth="500px"
        alignItems="center"
        columnSpacing={2}
        container
        padding={3}
        $isDarkTheme={isDarkTheme}
        $topValue="50%"
      >
        <Grid item xs={8}>
          <TextField
            fullWidth
            label={`${t("Enter")} ${t("New Item's Name")}`}
            placeholder={`${t("Enter")} ${t("Name")}...`}
            onChange={handleChangeName}
            value={item.name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleClose} variant="contained">
            {t("Save")}
          </Button>
        </Grid>
      </GridModal>
    </ModalStyled>
  );
}

EditItemNameModal.propTypes = {
  item: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setItem: PropTypes.func.isRequired,
}

export default memo(EditItemNameModal)