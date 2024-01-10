import { Paper, Typography, Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setLocation } from '../../modules/reducers/character';

function Main() {
  const dispatch = useDispatch();
  const gameLocations = useSelector(store => store.gameLocations);
  const character = useSelector(store => store.character);

const handleLocation = (id) => {
  // dispatch(setLocation(event.target.value));
  console.log(id);
  dispatch(setLocation(id));
}

  return (
    <Paper elevation={5}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        justifyContent={"space-evenly"}
      >
        <Typography variant="h5">Main Content Window</Typography>
        <Typography variant="body">{character.location}</Typography>
      </Grid>
    </Paper>
  );
}

export default Main;
