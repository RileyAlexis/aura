import { useState } from 'react';
import axios from 'axios';

//Material UI
import { Box, Grid, Stack, Paper, Button, Typography } from '@mui/material';

function AdminPage() {

const loadBackGroundData = () => {
    
}


    return (
        <Box>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item>
                    <Paper elevation={0}>
                        <Typography variant='h4'>Aura Admin</Typography>
                    </Paper>
                </Grid>
                </Grid>
        <Grid container spacing={2} justifyContent={"space-between"}
                style={{ margin: '10px'}}>
            <Paper elevation={2} >
                <Stack direction={"column"} spacing={2}
                    style={{ margin: '5px', padding: '5px'}}
                    >
                <Typography variant='h6'>Game Data</Typography>
                <Button variant='empty' onClick={loadBackGroundData}><Typography variant='body'>Load Background Data</Typography></Button>
                </Stack>
                </Paper>
        </Grid>
        </Box>
    )
}

export default AdminPage;