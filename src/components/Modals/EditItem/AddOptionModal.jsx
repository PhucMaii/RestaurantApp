import { Button, TextField, Modal, Grid } from '@mui/material';
import React, { useState } from "react";
import { nonNumericCharacter } from '../../../utils/constant';

export default function AddOptionModal({  handleClose, open, addOption }) {
    const [option, setOption] = useState({
        availability: true,
        name: "",
        price: 0
    })

    const resetField = () => {
      setOption({
        availability: true,
        name: "",
        price: 0,
      });
    };

  return (
    <Modal onClose={handleClose} open={open}>
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
          maxWidth: "500px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
      >
        <Grid item xs={12}>
            <TextField
                fullWidth 
                label="Enter New Option Name"
                placeholder="Enter Option Name..."
                onChange={(e) => setOption({...option, name: e.target.value})}
                value={option.name}
                variant="filled"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField 
                fullWidth 
                label="Enter New Option Price"
                placeholder="Enter Option Price..."
                onChange={(e) => setOption({...option, price: e.target.value.replace(nonNumericCharacter, "")})}
                value={option.price}
                variant="filled"
            />
        </Grid>
        <Grid columnSpacing={2} container justifyContent="right">
            <Grid item>
                <Button color="error" onClick={handleClose} variant="contained">Cancel</Button>
            </Grid>
            <Grid item>
                <Button color="primary" onClick={() => {
                    addOption(option);
                    resetField();
                    handleClose();
                }} variant="contained">Add</Button>
            </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}