import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { auraDefault } from "./modules/auraDefault";


import Login from "./components/Login/Login";

//Material UI
import { Grid, Typography, Paper, Stack, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import AuraTitle from "./components/Basics/AuraTitle";
import MoveableWindow from "./components/Basics/MoveableWindow";



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
const initialWindows = [
  {id: 0, position: {x: 0, y: 0}, size: {x: 200, y: 100}, child: <WindowOne />},
  {id: 1, position: {x: 0, y: 0}, size: {x: 200, y: 100}, child: <WindowTwo />},
];

const [windows, setWindows] = useState(initialWindows);

const handleDrag = (e, id) => {
  const { x, y } = e;

  setWindows((prevWindows) => {
    const windowIndex = prevWindows.findIndex((window) => window.id === id);

    if (windowIndex === -1) {
      // Window not found
      return prevWindows;
    }

    const updatedWindows = [...prevWindows];
    updatedWindows[windowIndex] = {
      ...updatedWindows[windowIndex],
      position: { x, y },
    };

    // Collision detection logic
    const movedWindow = updatedWindows[windowIndex];
    const otherWindows = updatedWindows.filter((win) => win.id !== id);

    const isColliding = otherWindows.some((otherWindow) => {
      const xOverlap =
        movedWindow.position.x < otherWindow.position.x + otherWindow.size.width &&
        movedWindow.position.x + movedWindow.size.width > otherWindow.position.x;

      const yOverlap =
        movedWindow.position.y < otherWindow.position.y + otherWindow.size.height &&
        movedWindow.position.y + movedWindow.size.height > otherWindow.position.y;

      return xOverlap && yOverlap;
    });

    if (!isColliding) {
      return updatedWindows;
    }

    // If collision detected, don't update positions
    return prevWindows;
  });
};




useEffect(() => {
  document.body.style.backgroundColor = currentTheme.body.backgroundColor;
}, []);


  return (
    <ThemeProvider theme={auraDefault}>

    <Grid container rowSpacing={2} columnSpacing={2} maxWidth="lg"
      justifyContent={'space-between'} alignItems={"flex-start"}>
        
      <Grid item component={AuraTitle} />   
      <Grid item component={AccountMenu} />
      </Grid>

      <Grid container justifyContent={'center'} alignItems={"flex-start"}>
       <MoveableWindow id={windows[0].id} position={windows[0].position} size={windows[0].size} handleDrag={handleDrag}>
        <WindowOne />
        </MoveableWindow> 
        <MoveableWindow id={windows[1].id} position={windows[1].position} size={windows[1].size} handleDrag={handleDrag}>
        <WindowTwo />
        </MoveableWindow> 
       
       


      {user.id !== undefined &&
      <>
      <Grid container justifyContent={'center'} alignItems={"center"}>
        <Grid item component={Login} />
      </Grid>
      </>
      }
      </Grid>

    </ThemeProvider>
  );
};

export default App;
