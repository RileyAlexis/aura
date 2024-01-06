import { Paper, Typography, Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Main() {
  const locations = useSelector((store) => store.locations);

  return (
    <Paper elevation={5}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        justifyContent={"space-around"}
      >
        {locations?.map((item) => {
          return (
            <Grid item key={item.id}>
              <Button variant="outline" key={item.id}>
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
