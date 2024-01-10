import { Paper, Typography, Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setLocation } from '../../modules/reducers/character';

function Main() {
  const dispatch = useDispatch();
  const GameLocations = useSelector(store => store.GameLocations);

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
        {GameLocations?.map((item) => {
          return (
            <Grid item key={item.id}>
              <Button variant="outline" key={item.id} onClick={() => handleLocation(item.id)}>
                {item.title} 
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

export default Main;
