import { useSelector, useDispatch } from "react-redux";

import { Grid, Button, Paper, Typography } from "@mui/material";

import { setLocation } from "../../modules/reducers/character";

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const character = useSelector(store => store.character);
  const gameLocations = useSelector(store => store.gameLocations);

  const handleLocation = (id) => {
    // dispatch(setLocation(event.target.value));
    console.log(id);
    dispatch(setLocation(id));
  }

  return (
    <Paper elevation={2}>

        {gameLocations.city?.map((item) => {
          return (
            <Grid item key={item.id}>
              <Button variant="outline" key={item.id} onClick={() => handleLocation(item.id)}>
                {item.title} 
              </Button>
            </Grid>
          );
        })}
    </Paper>
  );
}

export default Sidebar;
