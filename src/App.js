import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { auraDefault } from "./modules/auraDefault";

//Material UI
import { Grid, Typography, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";

//Components
import Login from "./components/Login/Login";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import AuraTitle from "./components/Basics/AuraTitle";
import Topbar from "./components/Basics/Topbar";
import MoveableWindow from "./components/Basics/MoveableWindow";
import Sidebar  from './components/Basics/Sidebar';



function App() {

  const WindowOne = () => {
    return (
      <Typography>Window One</Typography>
    )
  }
  
  const WindowTwo = () => {
    return (
      <Typography>Window Two</Typography>
    )
  }

const user = useSelector(store => store.user);
const userDisplay = JSON.stringify(user);
const [currentTheme, setCurrentTheme] = useState(auraDefault);

let windows = [
  {id: 0, position: {x: 0, y: 0}, size: {x: 200, y: 100}, child: <WindowOne />},
  {id: 1, position: {x: 0, y: 0}, size: {x: 200, y: 100}, child: <WindowTwo />},
];

useEffect(() => {
  document.body.style.backgroundColor = currentTheme.body.backgroundColor;
}, []);


  return (
    <ThemeProvider theme={auraDefault}>
<Box sx={{ flexGrow: 1, marginRight: 3 }}>
    
    {/* Top title and nav bar */}
    <Grid container rowSpacing={2} columnSpacing={2} gap={2} 
      justifyContent="space-between"
      alignItems="stretch"
      sx={{ marginBottom: 2 }}>
        
      <Grid item component={AuraTitle} xs={4} /> 
      <Grid item component={Topbar} xs={8} />
    </Grid>
    {/* End title and nav bar */}

    <Grid container rowSpacing={2} columnSpacing={2} justifyContent={"flex-start"}>
      <Grid item component={Sidebar} xs={12} md={5} />
      <Grid item xs={12} md={8}>
        <Paper>
          {user.id !== undefined && 
           <Login />
          }
          {console.log(user)}
          {user.userId && 
          <Typography>Main Box Content Goes Here!</Typography>
          }
          </Paper>
          </Grid>
        
        
        

      </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
