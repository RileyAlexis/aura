import { List, ListItem, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Sidebar() {
  const user = useSelector((store) => store.user);

  return (
    <Paper elevation={2}>
      <Typography>Side Bar Content</Typography>
      <List>
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
