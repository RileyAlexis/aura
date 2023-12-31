import { useState } from "react";

import { Menu, IconButton, MenuItem, Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    // For example: perform logout actions
    handleClose();
  };

  return (
    <Box>
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
    </Box>
  );
}

export default AccountMenu;
