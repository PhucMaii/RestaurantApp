import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
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
  Collapse,
} from "@mui/material";
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
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { TabStyled } from "./style";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentWindow, setCurrentWindow] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openSwitch, setOpenSwitch] = useState(true);
  const [busySwitch, setBusySwitch] = useState(true);
  const [notification, setNotification] = useState({});
  const navigate = useNavigate();

  const iconList = [
    {
      text: "Current Order",
      icon: <HomeIcon />,
    },
    {
      text: "Menu",
      icon: <MenuIcon />,
    },
    {
      text: "History",
      icon: <HistoryIcon />,
    },
    {
      text: "Feedback",
      icon: <StarIcon />,
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
    },
    {
      text: "Account",
      icon: <AccountCircleIcon />,
    },
    {
      text: "Sign out",
      icon: <LogoutIcon />,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  const handleSignout = () => {
    localStorage.clear();
    navigate("/");
  }

  const toggleOpenSwitch = () => {
    setOpenSwitch((prevSwitch) => !openSwitch);
  };

  const toggleBusySwitch = () => {
    if (!openSwitch) {
      setBusySwitch(false);
    } else {
      setBusySwitch((prevSwitch) => !busySwitch);
    }
  };

  useEffect(() => {
    if (!openSwitch) {
      setBusySwitch(false);
    }
  }, [openSwitch]);

  useEffect(() => {
    if (!openSwitch) {
      setNotification({
        color: red[800],
        message: "Stop Receiving Orders",
        icon: <DoNotDisturbOnIcon />,
      });
    } else if (busySwitch) {
      setNotification({
        color: yellow[800],
        message: "Preparing Time Is Increased",
        icon: <TimerIcon />,
      });
    } else {
      setNotification({
        color: green[700],
        message: "Accepting Orders",
        icon: <CheckCircleIcon />,
      });
    }
  }, [openSwitch, busySwitch]);

  const drawer = (
    <div>
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
        {iconList.map((iconObj) => (
          <React.Fragment key={iconObj.text}>
            <TabStyled
              isSelected={iconObj.text === currentWindow}
              onClick={() => {
                setCurrentWindow(iconObj.text);
                if (iconObj.text === "Account") {
                  handleOpenDropDown();
                }
              }}
            >
              <ListItemButton onClick={iconObj.text === "Sign out" && handleSignout}>
                <ListItemIcon>{iconObj.icon}</ListItemIcon>
                <ListItemText primary={iconObj.text} />
                {iconObj.text === "Account" ? (
                  openDropDown ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
            </TabStyled>
            {iconObj.text === "Account" && (
              <Collapse in={openDropDown}>
                <List>
                  <ListItem>
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Revenue" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Report" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Loyal Customer" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
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
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <ListItem>
            <ListItemIcon>{notification.icon}</ListItemIcon>
            <ListItemText primary={notification.message} />
          </ListItem>
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
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: grey[200],
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
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.tab}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
