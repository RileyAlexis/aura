import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { removeUser } from "../../modules/reducers/userStats";

import { Menu, IconButton, MenuItem, Grid } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function AccountMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios
      .post("/user/logout")
      .then((response) => {
        dispatch(removeUser());
        dispatch({ type: 'RESET_ENTIRE_STORE'});
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
    handleClose();
  };

  return (
    <Grid item>
      <IconButton
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        sx={{ padding: "15px" }}
      >
        <AccountCircle color="primary" />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </Grid>
  );
}

export default AccountMenu;
