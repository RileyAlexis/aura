import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { auraDefault } from "./modules/auraDefault";


import Login from "./components/Login/Login";

//Material UI
import { Grid, Typography, Paper, Stack, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import AuraTitle from "./components/Basics/AuraTitle";



function App() {

const user = useSelector(store => store.user);
const userDisplay = JSON.stringify(user);
const [currentTheme, setCurrentTheme] = useState(auraDefault)


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
      {user.id !== undefined &&
      <>
      <Grid container justifyContent={'center'} alignItems={"center"}>
        <Grid item component={Login} />
      </Grid>
      </>
      }

    </ThemeProvider>
  );
}

export default App;
