import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

//Material UI
import { ThemeProvider } from "@emotion/react";
import { Grid, Typography, Box, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { auraDefault } from "./modules/auraDefault";

//Components
import Login from "./components/Login/Login";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import AuraTitle from "./components/Basics/AuraTitle";
import Topbar from "./components/Basics/Topbar";
import MoveableWindow from "./components/Basics/MoveableWindow";
import Sidebar  from './components/Basics/Sidebar';

//Redux Actions
import { setUserData } from "./modules/reducers/userStats";

//Sockets
import { openSockets } from "./modules/auraSockets";

import './App.css';


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
const dispatch = useDispatch();
const [currentTheme, setCurrentTheme] = useState(auraDefault);
const isSmallScreen = useMediaQuery('(max-width: 600px)');
const [msgs, setMsgs] = useState([]);
const [value, setValue] = useState(0);

let windows = [
  {id: 0, position: {x: 0, y: 0}, size: {x: 200, y: 100}, child: <WindowOne />},
  {id: 1, position: {x: 0, y: 0}, size: {x: 200, y: 100}, child: <WindowTwo />},
];

useEffect(() => {
  document.body.style.backgroundColor = currentTheme.palette.backgroundColor.default;
  
  const checkToken = async () => {
    try {
      const response = await axios.get('/user/check-token');
      dispatch(setUserData(response.data));

    } catch (error) {
      console.log("Error authenticating session", error);
      setUserData(null);
    }
  };

  checkToken();
  openSockets(user, setMsgs);
}, []);


  return (
    <ThemeProvider theme={auraDefault}>
      
<Box sx={{ flexGrow: 1, margin: 0 }}>
    
    {/* Top title and nav bar */}
    <Grid container rowSpacing={2} columnSpacing={2} gap={2} maxWidth={'lg'}
      justifyContent="space-between"
      alignItems="stretch"
      sx={{ marginBottom: 2 }}>
        
      <Grid item component={AuraTitle} xs={4} /> 
      <Grid item component={Topbar} xs={8} />
    </Grid>
    {/* End title and nav bar */}
    
    {/* Main content grid */}
    <Grid container rowSpacing={2} columnSpacing={2} justifyContent={"flex-start"} alignItems={"baseline"}>
      {!isSmallScreen &&
      <Grid item component={Sidebar} sm={6} md={4} lg={2} />
      }
      <Grid item xs={12} sm={6} md={8} lg={10}>
          {/* //Show login if user is not logged in  */}
          {user.id === null && 
           <Login />
          }
          
          {/* //Show game content once user logs in  */}
          {user.userId &&
          // <MoveableWindow id={windows[0].id} size={windows[0].size} position={windows[0].position}>  
          //   <WindowOne />
          // </MoveableWindow>
          <>
          <Paper>
          <Typography>Main Box Content Goes Here</Typography>
          
          <Typography variant="body">Main Box content Main Box content Main Box content Main Box content Main Box content Main Box content Main Box content v Main Box content Main Box content Main Box content Main Box content Main Box content Main Box content Main Box content Main Box contentMain Box content Main Box content Main Box content Main Box content Main Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box contentMain Box content 
            </Typography><br /><br />
            <Typography variant="h5">{msgs.user}: {msgs.message}</Typography>
            
          
          </Paper>
          { isSmallScreen && 
            <Paper sx={{ position: 'fixed', bottom: 0, left:0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
              setValue(newValue);
            }}>
              <BottomNavigationAction label="Map" />
              <BottomNavigationAction label="Stats" />
              <BottomNavigationAction label="Home" />

            
            </BottomNavigation>
            </Paper>
          }
          </>
          }

          </Grid>
        
        
        

      </Grid>
      </Box>
      
    </ThemeProvider>
  );
};

export default App;
