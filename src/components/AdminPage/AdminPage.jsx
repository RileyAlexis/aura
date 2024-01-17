import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

//Material UI
import { Box, Grid, Stack, Paper, Button, Typography } from '@mui/material';

//Reducer Actions
import { setAdmin } from '../../modules/reducers/adminUser';

//Components
import Login from '../Login/Login';

function AdminPage() {
    const [gameLogs, setGameLogs] = useState([]);
    const adminUser = useSelector(store => store.adminUser);
    const dispatch = useDispatch();


const loadBackGroundData = () => {
    axios.post('/admin/loadBackGroundData')
    .then((response) => {
        console.log(response);
        setGameLogs((prevLogs) => [...prevLogs, response.data]);
    }).catch((error) => {
        console.error(error);
    })
};

const loadLocationsData = () => {
    axios.post('/admin/loadLocationData')
        .then((response) => {
            console.log(response);
            setGameLogs((prevLogs) => [...prevLogs, response.data]);
        }).catch((error) => {
            console.error(error);
        })
}

useEffect(() => {
    const checkToken = async () => {
        try {
          //logs user in if a valid token exists
          const response = await axios.get("/user/check-token");
          if (response.data.role === 'admin') {
            console.log('Admin Response.data', response.data);
          dispatch(setAdmin(response.data));
          } else setAdmin(null);
        } catch (error) {
          console.log("Error authenticating session", error);
          setAdmin(null);
        }
      };
      console.log(adminUser);
      checkToken();
  }, []);

    return (
        <Box>
        {adminUser.role === 'admin' &&
            <>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item>
                    <Paper elevation={0} style={{ padding: '10px' }}>
                        <Typography variant='h4'>Aura Admin</Typography>
                    </Paper>
                </Grid>
                </Grid>
        <Grid container spacing={2} justifyContent={"space-around"}
                style={{ margin: '10px'}}>
            <Grid item>
            <Stack direction={"column"} spacing={2}
                    style={{ margin: '5px', padding: '5px'}}
                    >
            <Paper elevation={2}>
                <Typography variant='h6'>Game Data</Typography>
                <Button variant='empty' onClick={loadBackGroundData}><Typography variant='body'>Load Background Data</Typography></Button>
                <Button variant='empty' onClick={loadLocationsData}><Typography variant='body'>Load Locations Data</Typography></Button>
                
                </Paper>
                </Stack>
                </Grid>

            <Grid item style={{ minWidth: '350px', minHeight: '500px' }}>
                <Paper elevation={2}>
                    <Typography variant='h6'>Data Log</Typography>
                    {gameLogs?.map((line, i) => (
                        <Stack key={i}>
                        <Typography variant='logger'>{line.message}</Typography>
                        </Stack>
                    ))}
                </Paper>
            </Grid>

        </Grid>
        </>
        }
        {adminUser.role !== 'admin' && 
            <Paper elevation={5}>
                <center>
                <Typography variant='h3'>Access Denied - Contact admin</Typography>
                <Login />
                </center>
            </Paper>
        }
        </Box>
    )
}

export default AdminPage;