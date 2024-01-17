import { useSelector, useDispatch } from "react-redux";

import { Grid, Button, Paper, Typography } from "@mui/material";

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

        {gameLocations?.map((item, i) => (
         
            <Grid item key={i}>
              <Button variant="outline" disableElevation size="small" onClick={() => handleLocation(i)}>
                {item.title} 
              </Button>
            </Grid>
          
        ))}
    </Paper>
  );
}

export default Sidebar;
