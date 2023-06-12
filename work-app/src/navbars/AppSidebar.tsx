import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type Anchor = "left";

const AppSidebar = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const { currentUser } = useSelector((state: any) => state.user);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home"].map((text, index) => (
          <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Products", "Locations"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {index === 0 && currentUser ? (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/products"}
                >
                  <ListItemText primary={text} />
                </Link>
              ) : (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/locations"}
                >
                  <ListItemText primary={text} />
                </Link>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Close"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default AppSidebar;
