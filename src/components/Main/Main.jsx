import { Paper, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setLocation } from '../../modules/reducers/character';
import { useEffect } from "react";

function Main({messages}) {
  const dispatch = useDispatch();
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
    <Paper elevation={2}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        justifyContent={"space-between"}
      >
        <Grid item sm={12}>
        <center><Typography variant="h5">Main Content Window</Typography></center>
        </Grid>
        <Grid item sm={12}>
        <Typography variant="body">{character.location}</Typography>
        </Grid>
        <Grid item sm={12}>
        <Typography variant="body">{screen}</Typography>
        </Grid>
        <Grid item sm={12}>
        <Typography variant="body">{JSON.stringify(messages)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Main;
