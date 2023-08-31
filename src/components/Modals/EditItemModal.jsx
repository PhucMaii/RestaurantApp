import { Button, Grid, Modal, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'

export default function EditItemModal(props) {
  return (
    <Modal open={props.handleOpen} close={props.handleClose}>
      <Grid container>
        <Grid container>
            <Grid item xs={3}>
                <Typography variant="h6">Noodle Soup</Typography>
                <Button><EditIcon /></Button>
            </Grid>
            
        </Grid>
      </Grid>
    </Modal>
  );
}
