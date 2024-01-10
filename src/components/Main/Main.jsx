import { Paper, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setLocation } from '../../modules/reducers/character';
import { useEffect } from "react";

function Main() {
  const dispatch = useDispatch();
  const gameLocations = useSelector(store => store.gameLocations);
  const character = useSelector(store => store.character);

  const [screen, setScreen] = useState(window.innerWidth + ' ' + window.innerHeight);

const handleLocation = (id) => {
  // dispatch(setLocation(event.target.value));
  console.log(id);
  dispatch(setLocation(id));
}

useEffect(() => {
  
  const handleResize = () => {
    setScreen(window.innerWidth + ' ' + window.innerHeight);
  }
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  }
}, [])

  return (
    <Paper elevation={5}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        justifyContent={"space-evenly"}
      >
        <Typography variant="h5">Main Content Window</Typography><br />
        <Typography variant="body">{character.location}</Typography><br />
        <Typography variant="body">{screen}</Typography>
      </Grid>
    </Paper>
  );
}

export default Main;
