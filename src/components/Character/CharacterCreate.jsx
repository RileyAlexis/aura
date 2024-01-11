import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Grid, Paper, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CharacterCreate() {

    const character = useSelector(store => store.character);
    const backgrounds = useSelector(store => store.backgrounds);

  const [name, setName] = useState('');
  const [selectedBackground, setSelectedBackground] = useState({});
  const [backgroundLabel, setBackgroundLabel] = useState('');
  const [error, setError] = useState('');
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

  const handleBackground = (event) => {
    console.log(event.target.value);
    setBackgroundLabel(event.target.value);
    setSelectedBackground(backgrounds[event.target.value]);
  }

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

        {/* Name Section */}
        <Grid item xs={12}>
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

        {/* Background Section */}
        <Grid item xs={12} md={4}>
            <FormControl sx={{ width: 200 }}>
                <InputLabel id="background-label">Background</InputLabel>
                <Select labelId="background-label" id="background" value={backgroundLabel} label="Background" onChange={handleBackground}>
                    {backgrounds?.map((background) => (
                        <MenuItem key={background.id} value={background.id}>{background.title}</MenuItem>
                    ))};
                </Select>
            </FormControl>
        </Grid>
        {selectedBackground !== null &&
        <Grid item xs={12} md={8}>
            <Typography variant="body">{selectedBackground.description}</Typography>
        </Grid>
        }
      </Grid>
    </Paper>
  );
}

export default CharacterCreate;
