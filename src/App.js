import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { auraDefault } from "./modules/auraDefault";


import Login from "./components/Login/Login";

//Material UI
import { Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";



function App() {

const user = useSelector(store => store.user);
const userDisplay = JSON.stringify(user);
const [currentTheme, setCurrentTheme] = useState(auraDefault)


useEffect(() => {
  document.body.style.backgroundColor = currentTheme.body.backgroundColor;
}, []);


  return (
    <ThemeProvider theme={auraDefault}>
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} maxWidth="xl">

      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Paper variant="elevation">
      <Typography variant="h3" color='#04d600'>
      Aura
      </Typography>
      </Paper>
      <Paper variant="elevation">
        <Typography variant="body">
        Player: {user.username}
        </Typography>
        <Typography variant="body">
          
        </Typography>
        
      </Paper>
      </Grid>
      
     
     <Grid item xs={12} sm={4} md={4} lg={4}>
      <Paper>
      {userDisplay}
      </Paper>
        
      </Grid>




      {user.id !== undefined &&
      <Grid item xs={12} md={12} lg={8}>
      <Login />
      </Grid>
    
      }
    </Grid>
    </ThemeProvider>
  );
}

export default App;
