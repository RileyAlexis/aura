import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

//Material UI
import { Box, Grid, Stack, Paper, Button, Typography, TextField, FormControlLabel, FormGroup, Slider, Switch, Checkbox } from '@mui/material';
import { auraDefault } from "../../modules/auraDefault";

//Reducer Actions
import { setAdmin } from '../../modules/reducers/adminUser';

//Sockets
import { socketService } from '../../modules/auraSockets';

//Components
import Login from '../Login/Login';


function AdminPage() {
    const [gameLogs, setGameLogs] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const [currentTheme, setCurrentTheme] = useState(auraDefault);
    const adminUser = useSelector(store => store.adminUser);
    const dispatch = useDispatch();
    const gridContainerRef = useRef();
    const lastItemRef = useRef();


    const loadBackGroundData = () => {
        axios.post('/admin/loadBackGroundData')
            .then((response) => {
                console.log(response);
                setGameLogs((prevLogs) => [response.data, ...prevLogs]);
            }).catch((error) => {
                console.error(error);
            })
    };

    const loadLocationsData = () => {
        axios.post('/admin/loadLocationData')
            .then((response) => {
                console.log(response);
                setGameLogs((prevLogs) => [response.data, ...prevLogs]);
            }).catch((error) => {
                console.error(error);
            })
    }

    const loadSkillSetData = () => {
        axios.post('/admin/loadSkillSetData')
            .then((response) => {
                console.log(response);
                setGameLogs((prevLogs) => [response.data, ...prevLogs]);
            }).catch((error) => {
                console.error(error);
            })
    }

    const loadJSONStuff = () => {
        axios.post('/admin/testJSON')
            .then((response) => {
                console.log(response);
                setGameLogs((prevLogs) => [response.data, ...prevLogs])
            }).catch((error) => {
                console.error(error);
            })
    }

    const handleMessage = () => {
        console.log(adminUser);
        socketService.emitEvent('message:post', { user: adminUser.username, message: newMessage });

        setNewMessage('');
    }

    useEffect(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = currentTheme.palette.backgroundColor.dark;

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
                    {/* ********* Title bar grid ********* */}

                    <Grid container spacing={2} justifyContent={"center"}>
                        <Grid item>
                            <Paper elevation={0} style={{ padding: '10px' }}>
                                <Typography variant='h4'>Aura Admin</Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* ********* Button boxes grid ********* */}

                    <Grid container ref={gridContainerRef} spacing={2} justifyContent={"space-around"}
                        style={{ margin: '10px' }}>


                        {/* ********* Game Data Box ********* */}
                        <Grid item>
                            <Paper elevation={2}>
                                <Stack>
                                    <center><Typography variant='h6' color='text.primary'>Game Data</Typography></center>

                                    <Button variant='empty' onClick={loadBackGroundData}>
                                        Load Background Data
                                    </Button>
                                    <Button variant='empty' onClick={loadLocationsData}>
                                        Load Locations Data
                                    </Button>
                                    <Button variant='empty' onClick={loadSkillSetData}>
                                        Load Skillset Data
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* ********* JSON Test Box ********* */}

                        <Grid item>
                            <Paper elevation={2}>
                                <Stack>
                                    <center><Typography variant='h6'>May Explode When Pressed</Typography></center>
                                    <Button variant='empty' onClick={loadJSONStuff}>
                                        JSON Save Route
                                    </Button>
                                    <FormGroup>
                                        <FormControlLabel value="false" control={<Checkbox value="false" color="secondary" />} label="Checking the things" />
                                        <Slider defaultValue={30} aria-label="Default" valueLabelDisplay="auto" color="secondary" />
                                        <Switch defaultChecked value="false" />
                                    </FormGroup>


                                </Stack>
                            </Paper>
                        </Grid>



                        {/* ********* Message Sending Box ********** */}
                        <Grid item>
                            <Paper elevation={3}>
                                <center>
                                    <Typography variant='h5'>Send Message</Typography>
                                </center>
                                <Grid item container alignContent={'center'}>
                                    <TextField variant='filled' size='small' label="Send Message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                                    <Button variant='empty' onClick={handleMessage}>
                                        Send
                                    </Button>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* *********** Data Log ********************* */}
                    <Grid container spacing={2} justifyContent={"space-around"} sm={12} style={{ marginTop: '100px' }}>
                        <Grid item ref={lastItemRef} style={{ minWidth: '75%', minHeight: '500px', maxHeight: '500px', overflowY: 'scroll' }}>
                            <Paper elevation={2} style={{ padding: '15px' }}>
                                <center>
                                    <Typography variant='h6'>Data Log</Typography>
                                </center>
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