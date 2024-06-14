import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CarRentalIcon from "@mui/icons-material/CarRental";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

import { Divider, Toolbar, Typography } from "@mui/material";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import HomeIcon from "@mui/icons-material/Home";
import { useUserAuth } from "../context/authContext";
const drawerWidth = 240;
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppSidebar = ({ isOpen, onClose }: DrawerProps) => {
  const { user } = useUserAuth();

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
          {/* <List>
            {["Luxury aircraft", "Luxury vehicles"].map((text, index) => (
              <ListItem key={text} disablePadding>
                {user && (
                  <ListItemButton key={text}>
                    <ListItemIcon>
                      {index === 0 ? (
                        <AirplaneTicketIcon />
                      ) : index === 1 ? (
                        <CarRentalIcon />
                      ) : null}
                    </ListItemIcon>

                    {index === 0 && user ? (
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
                    ) : (
                      <Link
                        key={text}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                        }}
                        to={"/vehicles"}
                      >
                        <ListItemText primary={text} key={text} />
                      </Link>
                    )}
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List> */}

          <List>
            {["About us"].map((text, index) => (
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
                to={"/about"}
                key={text}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
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
