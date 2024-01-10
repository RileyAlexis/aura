import { useRouteError } from "react-router-dom";
import { Paper, Typography, Grid, Button } from "@mui/material";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const goToMain = () => {};

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Paper elevation={3}>
        <Typography variant="h4">Dead End Street - 404</Typography>
        <Typography variant="body" color={"warning"}>
          {error.statusText || error.message}
        </Typography>
        <br />
        <Button variant="outline" onClick={goToMain}>
          Back
        </Button>
      </Paper>
    </Grid>
  );
}

export default ErrorPage;
