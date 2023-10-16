import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
    Box, 
    Button, 
    Divider, 
    Drawer, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Radio, 
    RadioGroup
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar({filterByPopular, filterByRating}) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [filterChoice, setFilterChoice] = useState('');

    const handleChangeFilterChoice = (e) => {
      setFilterChoice(e.target.value);
      if(e.target.value === 'rating') {
        filterByRating();
      } else {
        filterByPopular();
      }
    }

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
      <Box sx={{ width: 250 }} role="presentation">
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
        {
          <>
          <FormControl style={{marginLeft: '20px', marginTop: '10px'}}>
            <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={filterChoice}
              onChange={handleChangeFilterChoice}
            >
              <FormControlLabel
                value="popular"
                control={<Radio />}
                label="Most Popular"
              />
              <FormControlLabel value="rating" control={<Radio />} label="Rating" />
            </RadioGroup>
          </FormControl>
          <Divider />
          </>
        }
        <List>
          {tabList.map((tab) => (
            <ListItem key={tab.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.text} />
              </ListItemButton>
            </ListItem>
          ))}
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
          onClose={toggleDrawer}
        >
          {list()}
        </Drawer>
      </React.Fragment>
  </div>
  )
}

Sidebar.propTypes = {
  filterByPopular: PropTypes.func,
  filterByRating: PropTypes.func
}