import React, { useState } from 'react';
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

export default function ChangeAddressModal() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const list = () => (
    <Box role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EditLocationAltIcon />
            </ListItemIcon>
            <ListItemText primary="Change Address" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer}>1805 Sixth Avenue</Button>
        <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
