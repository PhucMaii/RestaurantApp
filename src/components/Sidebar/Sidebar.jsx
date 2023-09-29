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
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import TimerIcon from "@mui/icons-material/Timer";
import { grey, green, red, yellow } from "@mui/material/colors";
import { TabStyled } from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { renderSkeleton } from '../../utils/renderUtils';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ThemeContext } from '../../Provider/ThemeContext';

const drawerWidth = 250;
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function ResponsiveDrawer({window, tab}) {
  const [currUser, _setCurrUser] = useLocalStorage('current-user', {});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSwitch, setOpenSwitch] = useState(false);
  const [busySwitch, setBusySwitch] = useState(false);
  const [notification, setNotification] = useState({});
  const {isDarkTheme, toggleDarkTheme} = useContext(ThemeContext);

  
  const docId = currUser.docId;
  const userCollection = collection(db, 'users');
  const userRef = query(userCollection, where('docId', '==', docId));
  const navigate = useNavigate();
  const location = useLocation();

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
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
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
    toggleDarkTheme(false)
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
                  <MaterialUISwitch checked={isDarkTheme} onChange={(e) => toggleDarkTheme(e.target.checked)} />
                }
                label={isDarkTheme ? "Light Mode" : "Dark Mode"}
              />
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
              <ListItemText primary={notification.message} />
            </ListItem>
          )}
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
              backgroundColor:grey[500],
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
