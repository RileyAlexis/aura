import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from "axios";

//Material UI
import { ThemeProvider } from "@emotion/react";
import { Grid, Box, } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { auraDefault } from "./modules/auraDefault";


//Components
import AuraTitle from "./components/Basics/AuraTitle";
import Topbar from "./components/Basics/Topbar";
import Sidebar from "./components/Basics/Sidebar";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import BottomMenu from "./components/Basics/BottomMenu";
import CharacterCreate from "./components/Character/CharacterCreate";
import AdminPage from "./components/AdminPage/AdminPage";

//Redux Actions
import { setUserData } from "./modules/reducers/userStats";

//Sockets
import { openSockets } from "./modules/auraSockets";

//Utility Functions
import { loadCharacter, loadGame } from "./modules/utility";

import "./App.css";

function App() {

  const user = useSelector((store) => store.user);
  const character = useSelector(store => store.character);
  const dispatch = useDispatch();
  const [currentTheme, setCurrentTheme] = useState(auraDefault);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    // document.body.style.backgroundColor =
    //   currentTheme.palette.backgroundColor.default;

    console.log("isSmallScreen", isSmallScreen);

    const checkToken = async () => {

      await axios.get("/user/check-token")
        .then((response) => {
          dispatch(setUserData(response.data));
          loadCharacter();
          loadGame();
          openSockets(); //initializes websockets connection
        }).catch((error) => {
          console.log("Error authenticating user", error);
          dispatch(setUserData(''));
        })

    };

    checkToken();
  }, []);


  return (
    <ThemeProvider theme={auraDefault}>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminPage} />
        </Switch>

        <Route path="/" exact>
          <Box sx={{ flexGrow: 1, margin: 0 }}>

            {/* Top title and nav bar */}
            <Grid container rowSpacing={2} columnSpacing={2} gap={2} justifyContent="space-between" alignItems="baseline"
              sx={{ marginBottom: 3 }}>
              <Grid item component={AuraTitle} />
              <Grid item component={Topbar} />
            </Grid>

            {/* End title and nav bar */}

            {/* Main content grid */}
            <Grid container rowSpacing={2} columnSpacing={2} maxWidth={"xl"} justifyContent={"space-between"} alignContent={"baseline"}>

              {!isSmallScreen && user.userId && (
                <Grid item component={Sidebar} />
              )}


              <Grid item sm={9} md={10}>

                {!user.userId &&
                  <Login />
                }

                {character.name === '' && user.userId &&
                  <CharacterCreate />
                }

                {character.name !== '' && user.userId &&
                  <Main messages={msgs} />
                }

              </Grid>



              {isSmallScreen && user.userId && (
                <BottomMenu />
              )}
            </Grid>
          </Box>
        </Route>

      </Router>
    </ThemeProvider>
  );
}

export default App;
