import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function CustomDrawer() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  const list = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <AccountCircleIcon sx={{ marginRight: "10px" }} />
          <ListItemText primary="Обо мне" />
        </ListItem>
        {user[0].rank === "boss" ? (
          <div>
            <ListItem button onClick={handleUsers}>
              <PersonSearchIcon sx={{ marginRight: "10px" }} />
              <ListItemText primary="Пользователи" />
            </ListItem>
            <ListItem button>
              <PersonAddIcon sx={{ marginRight: "10px" }} />
              <ListItemText primary="Создать пользователя" />
            </ListItem>
            <ListItem button>
              <AssignmentIcon sx={{ marginRight: "10px" }} />
              <ListItemText primary="Задачи" />
            </ListItem>
          </div>
        ) : null}
        <ListItem button onClick={handleLogin}>
          <LogoutIcon sx={{ marginRight: "10px" }} />
          <ListItemText primary="Выйти" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        // className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {list}
      </Drawer>
    </div>
  );
}
