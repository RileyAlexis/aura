import { useSelector, useDispatch } from "react-redux";

import { Grid, Button, Paper, Typography, Stack } from "@mui/material";

import { setLocation } from "../../modules/reducers/character";

function Sidebar() {
  const dispatch = useDispatch();
  const gameLocations = useSelector(store => store.gameLocations);

  const handleLocation = (id) => {
    // dispatch(setLocation(event.target.value));
    console.log(id);
    dispatch(setLocation(id));
  }

  return (
    <Paper elevation={2}>
      <Stack>
        {gameLocations?.map((item, i) => (
          <Button key={i} variant="sidebar" size="small" onClick={() => handleLocation(i)}>
            {item.title}
          </Button>

        ))}
      </Stack>
    </Paper>
  );
}

export default Sidebar;
