import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AppHeader from "./AppHeader";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 300;

const AppSidebar = () => {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <Box>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AppHeader />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "absolute",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard"].map((text, index) => (
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/"}
                key={text}
              >
                <ListItem key={text}>
                  <ListItemButton>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          {currentUser && <Typography sx={{ marginLeft: 5 }}>Admin</Typography>}
          <List>
            {[
              "Roles",
              "Locations",
              "Departments",
              "Positions",
              "Associates",
              "Resource groups",
              "Event types",
              "Reports",
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                {currentUser && (
                  <ListItemButton key={text}>
                    <ListItemIcon>
                      {index === 0 ? (
                        <AccountBoxIcon />
                      ) : index === 1 ? (
                        <LocationOnIcon />
                      ) : index === 2 ? (
                        <ApartmentIcon />
                      ) : index === 3 ? (
                        <RecentActorsIcon />
                      ) : index === 4 ? (
                        <PeopleAltIcon />
                      ) : index === 5 ? (
                        <PeopleIcon />
                      ) : index === 6 ? (
                        <EventNoteIcon />
                      ) : (
                        <ListAltIcon />
                      )}
                    </ListItemIcon>
                    {index === 0 && currentUser ? (
                      <Link
                        key={text}
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={"/products"}
                      >
                        <ListItemText primary={text} />
                      </Link>
                    ) : index === 1 ? (
                      <Link
                        key={text}
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={"/locations"}
                      >
                        <ListItemText primary={text} key={text} />
                      </Link>
                    ) : (
                      <Link
                        key={text}
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={"/departments"}
                      >
                        <ListItemText primary={text} key={text} />
                      </Link>
                    )}
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
          <Toolbar />
        </Box>
        <Typography sx={{ marginTop: 37, marginLeft: 15 }}>1.11.7</Typography>
      </Drawer>
    </Box>
  );
};

export default AppSidebar;
