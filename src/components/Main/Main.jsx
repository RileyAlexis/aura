import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Material UI
import { Paper, Typography, Grid, Button, Stack } from "@mui/material";

//Slice Reducers
import { setLocation } from '../../modules/reducers/character';
import { setAllOnlineUsers } from "../../modules/reducers/onlineUsers";
import { setAllTickerData } from "../../modules/reducers/newsTicker";

//Sockets
import { socketService } from "../../modules/auraSockets";


function Main() {
  const dispatch = useDispatch();
  const character = useSelector(store => store.character);
  const onlineUsers = useSelector(store => store.onlineUsers);
  const newsTicker = useSelector(store => store.newsTicker);
  const [screen, setScreen] = useState(window.innerWidth + ' ' + window.innerHeight);

const handleLocation = (id) => {
  // dispatch(setLocation(event.target.value));
  console.log(id);
  dispatch(setLocation(id));
}

useEffect(() => {
  
  const handleResize = () => {
    setScreen(window.innerWidth + ' ' + window.innerHeight);
  }
  window.addEventListener('resize', handleResize);

  
  socketService.onEvent('messages', ((data) => {
    console.log(data);
    dispatch(setAllTickerData(data));
  }))

  return () => {
    window.removeEventListener('resize', handleResize);
  }

}, [])

  return (
    <Paper elevation={2}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        justifyContent={"space-between"}
      >
        <Grid item sm={12}>
        <center><Typography variant="h5">Main Content Window</Typography></center>
        </Grid>
        <Grid item sm={12}>
        <Typography variant="body">{character.location}</Typography>
        </Grid>
        <Grid item sm={12}>
        <Typography variant="body">{screen}</Typography>
        </Grid>
        <Grid item sm={12}>
      {/* <Typography variant="body">{JSON.stringify(newsTicker)}</Typography> */}

          {newsTicker?.map((message, i) => (
            <Stack key={i}>
            <Typography variant="body">{message.user} - {message.message}</Typography>
            </Stack>
          ))}


        </Grid>
        <Grid item sm={12}>
        <Typography variant="body">{JSON.stringify(onlineUsers)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Main;
