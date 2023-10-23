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
import { AppBar, Toolbar } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AppHeader from "./AppHeader";
import HomeIcon from "@mui/icons-material/Home";
const drawerWidth = 240;
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppSidebar = ({ isOpen, onClose }: DrawerProps) => {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
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
            {["Home"].map((text, index) => (
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
                to={"/"}
                key={text}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
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
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                        }}
                        to={"/products"}
                      >
                        <ListItemText primary={text} />
                      </Link>
                    ) : index === 1 ? (
                      <Link
                        key={text}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                        }}
                        to={"/locations"}
                      >
                        <ListItemText primary={text} key={text} />
                      </Link>
                    ) : (
                      <Link
                        key={text}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                        }}
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
      </Drawer>
    </>
  );
};

export default AppSidebar;
