import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Divider, 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { TabStyled } from './styles';

export default function Sidebar() {
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    }

    const tabList = [
        {
          text: 'Dashboard',
          icon: <HomeIcon />,
          path: '/customer/home',
        },
        {
          text: 'History',
          icon: <HistoryIcon />,
          path: '/customer/history',
        },
        {
          text: 'Feedback',
          icon: <StarIcon />,
          path: '/customer/feedback',
        },
        {
            text: 'Favorites',
            icon: <FavoriteIcon />,
            path: '/customer/favorites'
        },
        {
          text: 'Sign Out',
          icon: <LogoutIcon />,
          path: '/',
        },
    ];

    const list = () => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Phuc Mai" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
          <List>
            {
                tabList.map((tab) => (
                    <TabStyled key={tab.text} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            {tab.icon}
                          </ListItemIcon>
                          <ListItemText primary={tab.text} />
                        </ListItemButton>
                  </TabStyled>
                ))
            }
            </List>
        </Box>
      );
    
  return (
    <div>

      <React.Fragment>
        <Button color="inherit" onClick={toggleDrawer}><MenuIcon /></Button>
        <Drawer
          anchor='left'
          open={openDrawer}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
  </div>
  )
}
