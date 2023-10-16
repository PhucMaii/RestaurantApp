import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import EditAddress from './EditAddress';

export default function ChangeAddressModal({address, changeAddress}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div>
      <React.Fragment>
        <EditAddress
          address={address}
          isOpen={openEditModal}
          onClose={handleCloseEditModal}
          changeAddress={changeAddress}
        />
        <Button onClick={toggleDrawer}>{address.split(',')[0]}</Button>
        <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer}>
          <Box role="presentation" onClick={toggleDrawer}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleOpenEditModal}>
                  <ListItemIcon>
                    <EditLocationAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Address" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

ChangeAddressModal.propTypes = {
    address: PropTypes.string.isRequired,
    changeAddress: PropTypes.func.isRequired
}