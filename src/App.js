import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

//Material UI
import { ThemeProvider } from "@emotion/react";
import { Grid, Typography, Box, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { auraDefault } from "./modules/auraDefault";


//Components
import AuraTitle from "./components/Basics/AuraTitle";
import Topbar from "./components/Basics/Topbar";
import Sidebar from "./components/Basics/Sidebar";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import BottomMenu from "./components/Basics/BottomMenu";
import CharacterCreate from "./components/Character/CharacterCreate";

//Redux Actions
import { setUserData } from "./modules/reducers/userStats";

//Sockets
import { openSockets } from "./modules/auraSockets";

//Utility Functions
import { loadCharacter } from "./modules/utility";

import "./App.css";

function App() {

  const user = useSelector((store) => store.user);
  const character = useSelector(store => store.character);
  const dispatch = useDispatch();
  const [currentTheme, setCurrentTheme] = useState(auraDefault);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [msgs, setMsgs] = useState([]);
  


  useEffect(() => {
    document.body.style.backgroundColor =
      currentTheme.palette.backgroundColor.default;

    const checkToken = async () => {
      try {
        //logs user in if a valid token exists
        const response = await axios.get("/user/check-token");
        dispatch(setUserData(response.data));
        loadCharacter();
      } catch (error) {
        console.log("Error authenticating session", error);
        setUserData(null);
      }
    };

    checkToken();
    openSockets(user, setMsgs); //initializes websockets connection
  }, []);


  return (
    <ThemeProvider theme={auraDefault}>
  

      <Box sx={{ flexGrow: 1, margin: 0 }}>
        
        {/* Top title and nav bar */}
        <Grid container rowSpacing={2} columnSpacing={2} gap={2} maxWidth={"lg"} justifyContent="space-between" alignItems="stretch"
          sx={{ marginBottom: 2 }}>
          <Grid item component={AuraTitle} xs={4} />
          <Grid item component={Topbar} xs={8} />
        </Grid>

        {/* End title and nav bar */}

        {/* Main content grid */}
        <Grid container rowSpacing={2} columnSpacing={2} justifyContent={"flex-start"} alignItems={"baseline"}>
          
          {!isSmallScreen && user.userId && (
            <Grid item component={Sidebar} sm={6} md={3} lg={3} />
          )}
            {!user.userId &&
          <Grid item xs={12} sm={6} md={8} lg={10}>
            <Login />
            </Grid>
            }

            {user.userId &&
            <Grid item xs={12} sm={9} md={9} lg={9}>
            {character.name === '' && 
              <CharacterCreate />
              
            }
            {character.name !== '' && user.userId &&
            <Main />
            }
              </Grid>
            }

            {isSmallScreen && user.userId && (
              <BottomMenu />
            )}
          </Grid>
      </Box>

    </ThemeProvider>
  );
}

export default App;
