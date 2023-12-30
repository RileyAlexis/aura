import { useSelector } from "react-redux";
import Login from "./components/Login/Login";

//Material UI
import { Grid, Container, Box, Typography } from "@mui/material";



function App() {

const user = useSelector(store => store.user);
const userDisplay = JSON.stringify(user);

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} maxWidth="xl">

      <Grid item xs={12} sm={4} md={4} lg={4} 
            sx={{ border: 1 }}>
      <Typography variant="h3">
      Aura
      </Typography>
      </Grid>
     
     <Grid item xs={12} sm={4} md={4} lg={4} sx={{ border: 1 }}>
      {userDisplay}
      </Grid>




      {user.id &&
      <Grid item xs={12} md={12} lg={8}>
      <Login />
      </Grid>
    
      }
    </Grid>
  );
}

export default App;
