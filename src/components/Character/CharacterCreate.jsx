import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Grid, Paper, Typography, Button, TextField } from "@mui/material";

function CharacterCreate() {
  const [name, setName] = useState();
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);

  const checkName = () => {
    console.log(name);
    setError(null);
    const dataObj = {
        text: name
    }
    if (name !== undefined) {
        axios.post('/naughty/check', dataObj)
        .then((response) => {
            console.log(response.data);
            if (response.data.message) { 
                setError(response.data.message); 
            } else {
                setError(response.data.ok);
                setChecked(true);
            }
        });
    } else {
        return;
    }


  };

  return (
    <Paper elevation={3}>
      <center>
        <Typography variant="h6">Create New Character</Typography>
      </center>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        justifyContent={"flex-start"}
      >
        <Grid item xs={12} md={12} >
          <TextField
            variant="filled"
            label="Character Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> 
          <Button variant="outlined" onClick={checkName}>Check</Button>
          {error !== null && error !== 'OK' &&
          
            <Typography variant="body" color='error'>{error}</Typography>
          }
          {error !== null && error === 'OK' &&
            <Typography variant="body">{error}</Typography>
          }
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CharacterCreate;
