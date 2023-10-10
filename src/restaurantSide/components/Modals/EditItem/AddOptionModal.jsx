import { Button, TextField, Modal, Grid } from '@mui/material';
import React, { memo, useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { nonNumericCharacter } from '../../../utils/constant';
import { GridModal } from '../style';
import { ThemeContext } from '../../../../Provider/ThemeContext';

function AddOptionModal({ handleClose, open, addOption }) {
    const [option, setOption] = useState({
        availability: true,
        name: "",
        price: 0
    })
    const {isDarkTheme} = useContext(ThemeContext);
    const { t } = useTranslation();
    const resetField = () => {
      setOption({
        availability: true,
        name: "",
        price: 0,
      });
    };

  return (
    <Modal onClose={handleClose} open={open}>
      <GridModal
        alignItems="center"
        container
        padding={2}
        rowGap={2}
        maxWidth="500px"
        $isDarkTheme={isDarkTheme}
      >
        <Grid item xs={12}>
            <TextField
                fullWidth 
                label={`${t("Enter")} ${t("Option Name")}`}
                placeholder="eg: Less Spicy"
                onChange={(e) => setOption({...option, name: e.target.value})}
                value={option.name}
                variant="filled"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField 
                fullWidth 
                label={`${t("Enter")} ${t("Option Price")}`}
                onChange={(e) => setOption({...option, price: +e.target.value.replace(nonNumericCharacter, "")})}
                value={option.price}
                variant="filled"
            />
        </Grid>
        <Grid columnSpacing={2} container justifyContent="right">
            <Grid item>
                <Button color="error" onClick={handleClose} variant="contained">{t("Cancel")}</Button>
            </Grid>
            <Grid item>
                <Button color="primary" onClick={() => {
                    addOption(option);
                    resetField();
                    handleClose();
                }} variant="contained">{t("Add")}</Button>
            </Grid>
        </Grid>
      </GridModal>
    </Modal>
  );
}

AddOptionModal.propTypes = {
  handleClose: PropTypes.func.isRequired, 
  open: PropTypes.bool.isRequired,
  addOption: PropTypes.func.isRequired,
}

export default memo(AddOptionModal)