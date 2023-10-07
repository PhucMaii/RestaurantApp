import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import TimerIcon from "@mui/icons-material/Timer";
import { green, red, yellow } from "@mui/material/colors";
import { ListItemTextStyled, TabStyled } from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { renderSkeleton } from '../../utils/renderUtils';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ThemeContext } from '../../Provider/ThemeContext';
import { useTheme } from '@mui/material/styles';
import TogggleThemeSwitch from '../ToggleThemeSwitch';

const drawerWidth = 250;

function ResponsiveDrawer({window, tab}) {
  const [currUser, _setCurrUser] = useLocalStorage('current-user', {});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSwitch, setOpenSwitch] = useState(false);
  const [busySwitch, setBusySwitch] = useState(false);
  const [notification, setNotification] = useState({});
  const {isDarkTheme, toggleDarkTheme, toggleDarkThemeOnLocal} = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const docId = currUser.docId;
  const userCollection = collection(db, 'users');
  const userRef = query(userCollection, where('docId', '==', docId));
  
  const iconList = [
    {
      text: 'Current Order',
      icon: <HomeIcon />,
      path: '/home',
    },
    {
      text: 'Menu',
      icon: <MenuIcon />,
      path: '/menu',
    },
    {
      text: 'History',
      icon: <HistoryIcon />,
      path: '/history',
    },
    {
      text: 'Feedback',
      icon: <StarIcon />,
      path: '/feedback',
    },
    {
      text: 'Account',
      icon: <AccountCircleIcon />,
      path: '/account',
    },
    {
      text: 'Sign out',
      icon: <LogoutIcon />,
      path: '/',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignout = () => {
    toggleDarkTheme(false);
    localStorage.clear();
  };

  const fetchSwitch = async () => {
    setIsLoading(true)
    try {
      let busyMode, openMode;
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        busyMode = data.isBusy;
        openMode = data.isOpen;
      })
      setBusySwitch(busyMode);
      setOpenSwitch(openMode);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  const toggleOpenSwitch = (e) => {
    setOpenSwitch(e.target.checked);
    updateSwitchValue('isOpen', !openSwitch);
    if(openSwitch) {
      updateSwitchValue('isBusy', false);
    }
  };

  const toggleBusySwitch = (e) => {
    if (!openSwitch) {
      setBusySwitch(false);
    } else {
      setBusySwitch(e.target.checked);
    }
    updateSwitchValue('isBusy', !busySwitch)
  };

  const toggleThemeMode = (e) => {
    toggleDarkTheme(e.target.checked);
    toggleDarkThemeOnLocal(e.target.checked);
  }

  const updateSwitchValue = async (switchField, boolValue) => {
    try {
      const docRef = doc(db, 'users', docId);
      await updateDoc(docRef, { [switchField]: boolValue });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSwitch();
  }, [])

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!openSwitch) {
      setBusySwitch(false);
      setNotification({
        color: red[800],
        message: 'Stop Receiving Orders',
        icon: <DoNotDisturbOnIcon />,
      });
    } else if (busySwitch) {
      setNotification({
        color: yellow[800],
        message: 'Preparing Time Is Increased',
        icon: <TimerIcon />,
      });
    } else {
      setNotification({
        color: green[700],
        message: 'Accepting Orders',
        icon: <CheckCircleIcon />,
      });
    }
  }, [openSwitch, busySwitch]);

  const drawer = (
    <div>
      {isLoading ? (
        <Grid container justifyContent="center" alignItems="center" rowGap={3} p={3}>
          {renderSkeleton(2, 'rounded', 60)}
          <Grid item textAlign="center" xs={12}>
            <Divider />
          </Grid>
          {renderSkeleton(7, 'rounded', 60)}
        </Grid>
      ) : (
        <>
          <Toolbar>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={openSwitch} onChange={toggleOpenSwitch} />
                }
                label="Open"
              />
              <FormControlLabel
                control={
                  <Switch checked={busySwitch} onChange={toggleBusySwitch} />
                }
                label="Busy"
              />
            </FormGroup>
          </Toolbar>
          <Divider />
          <List>
            {iconList.length > 0 && iconList.map((iconObj) => (
              <React.Fragment key={iconObj.text}>
                <TabStyled
                  $ischoose={iconObj.path === currentPath} // using transient-props to avoid error lines
                  $isDarkTheme={isDarkTheme}
                  onClick={() => {
                    navigate(iconObj.path);
                    if (iconObj.text === 'Sign out') {
                      handleSignout();
                    }
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{iconObj.icon}</ListItemIcon>
                    <ListItemText primary={iconObj.text} />
                  </ListItemButton>
                </TabStyled>
              </React.Fragment>
            ))}
          </List>
        </>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ backgroundColor: notification.color }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {isLoading ? (
            <ListItem>
              <ListItemIcon>
                <CircularProgress />
              </ListItemIcon>
              <ListItemText primary="Loading..." />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemIcon>{notification.icon}</ListItemIcon>
              <ListItemTextStyled primary={notification.message} />
            </ListItem>
          )}
          <FormControlLabel
            control={
              <TogggleThemeSwitch checked={isDarkTheme} onChange={toggleThemeMode} />
            }
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {tab}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  tab: PropTypes.node.isRequired,
  window: PropTypes.func,
};

export default ResponsiveDrawer;
