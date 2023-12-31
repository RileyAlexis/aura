import { useSelector } from "react-redux";

import { List, ListItem, Paper, Typography } from "@mui/material";

function Sidebar() {
  const user = useSelector((store) => store.user);

  return (
    <Paper elevation={2}>
      <Typography>Side Bar Content</Typography>
      <List dense>
        <ListItem>Player: {user.username}</ListItem>
        <ListItem>Level: </ListItem>
        <ListItem>Location: </ListItem>
        <ListItem>Rewards: </ListItem>
        <ListItem>Energy: </ListItem>
        <ListItem>Charm: </ListItem>
      </List>
    </Paper>
  );
}

export default Sidebar;
