import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CarRentalIcon from "@mui/icons-material/CarRental";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Divider, Toolbar, Typography } from "@mui/material";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
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
          <Divider sx={{ width: "100%" }} />
          <List>
            {["Luxury aircraft", "Luxury vehicles", "Luxury office spaces"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  {currentUser && (
                    <ListItemButton key={text}>
                      <ListItemIcon>
                        {index === 0 ? (
                          <AirplaneTicketIcon />
                        ) : index === 1 ? (
                          <CarRentalIcon />
                        ) : index === 2 ? (
                          <ApartmentIcon />
                        ) : null}
                      </ListItemIcon>

                      {index === 0 && currentUser ? (
                        <>
                          <Link
                            key={text}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              width: "100%",
                            }}
                            to={"/airplanes"}
                          >
                            <ListItemText primary={text} />
                          </Link>
                        </>
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
              )
            )}
          </List>
          <Toolbar />
        </Box>
        <Box
          component={"img"}
          src={"https://i.imgur.com/86nj6ys.png"}
          sx={{
            width: "100%",
            marginTop: 25,
            marginLeft: -1,
          }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          marginLeft={-3}
        >
          {"Copyright © "}
          <Typography color="inherit">Gold Estate</Typography>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Drawer>
    </>
  );
};

export default AppSidebar;
