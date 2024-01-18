import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Grid, Paper, Typography, Button, TextField, FormControl, InputLabel, MenuItem, 
        Select, List, ListItem, ListItemText, Stack } from "@mui/material";
import { setAllCharacterData } from "../../modules/reducers/character";
import { saveCharacter } from "../../modules/utility";

function CharacterCreate() {

    const character = useSelector(store => store.character);
    // const backgrounds = useSelector(store => store.backgrounds);
    const skillsets = useSelector(store => store.skillsets);
    
    const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [backgrounds, setBackGrounds] = useState();
  const [selectedBackground, setSelectedBackground] = useState({});
  const [backgroundLabel, setBackgroundLabel] = useState('');
  const skillsArr = ['basic', 'thieving', 'crime', 'network', 'corporate', 'hardware', 'cybernetic', 'engineering'];
  
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    
 
    axios.get('/gameData/backgrounds')
        .then((response) => {
            console.log('Response', response.data);
            setBackGrounds(response.data);
        }).catch((error) => {
        console.error("Error getting background data", error);
        });

}, []);

  const checkName = () => {
    console.log(name);
    setError(null);
    const dataObj = {
        text: name
    }
    if (name === '') { return setError('Enter a character name');}
    if (name !== undefined || name !== '') {
        axios.post('/naughty/check', dataObj)
        .then((response) => {
            console.log(response.data);
            if (response.data.message) { 
                setError(response.data.message); 
                setChecked(false);
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
    console.log(backgrounds[event.target.value].title, typeof backgroundLabel);
    setSelectedBackground(backgrounds[event.target.value]);
    setBackgroundLabel(backgrounds[event.target.value].title);
  }

  const setCharacter = async () => {
    // console.log(selectedBackground.id, checked);
    if (selectedBackground.id === undefined) { return (setError("Select a background")) }
    if (name === '' || name === undefined) { return (setError("Enter a character name")) }
    console.log('selectedBackground', selectedBackground);
       if (checked) {
        setError('');
        const charObj = {
            name: name,
            background: selectedBackground.id,
            stats: selectedBackground.stats,
            basic_skills: selectedBackground.basic_skills,
            thieving_skills: selectedBackground.thieving_skills,
            crime_skills: selectedBackground.crime_skills,
            network_skills: selectedBackground.network_skills,
            corporate_skills: selectedBackground.corporate_skills,
            hardware_skills: selectedBackground.hardware_skills,
            cybernetic_skills: selectedBackground.cybernetic_skills,
            engineering_skills: selectedBackground.engineering_skills,
            gameLocation: 0
            }
            console.log('character obj', charObj);
        await dispatch(setAllCharacterData(charObj));
        saveCharacter();
        } else if (!checked) {
            checkName();
        }
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

  return (
    <Paper elevation={3}>
      <center>
        <Typography variant="h6">Create New Character</Typography>
      </center>
      <Grid container rowSpacing={2} columnSpacing={2} justifyContent={"flex-start"}>

        {/* Name Section */}
        <Grid item xs={12}>
          <TextField variant="filled" label="Character Name" required value={name} onChange={(e) => setName(e.target.value)}/> 
            <Button variant="outlined" onClick={checkName}>Check</Button>
                {error !== null && error !== 'OK' &&
                    <Typography variant="body" color='error'>{error}</Typography>
                }
                {error !== null && error === 'OK' &&
                    <Typography variant="body">{error}</Typography>
                }
        </Grid>
        {/* End Name Section */}
        
        {/* Background Section */}
        <Grid item xs={12} md={4}>
            <FormControl sx={{ width: 200 }}>
                <InputLabel id="background-label">Background</InputLabel>
                    <Select labelId="background-label" id="background" value={selectedBackground.title} label="Background" onChange={handleBackground}>
                        {backgrounds?.map((background, i) => (
                            <MenuItem key={background.id} value={i}>{background.title}</MenuItem>
                            ))}
                    </Select>
            </FormControl>
        </Grid>
        
        {selectedBackground !== null &&
        <Grid item xs={12} md={8}>
            <Typography variant="body">{selectedBackground.description}</Typography>
                <br />
                    {selectedBackground.stats &&
                        <Grid item container xs={12} md={12} alignItems={"baseline"} justifyContent={"space-around"}>
                            <List dense disablePadding>
                                <Typography variant="h5">Stats:</Typography>
                            {Object.entries(selectedBackground.stats).map(([key, value]) => (
                                key !== 'alive' &&
                                <Stack key={key}>
                                        <Typography variant="subtitle1">{capitalizeFirstLetter(key)} : {value}</Typography>
                                </Stack>  
                                                              
                            ))}
                            </List>
                    
                            <List dense disablePadding>
                                <Typography variant="h5">Skills:</Typography>
                                  {Object.entries(selectedBackground).map(([key, value]) => (
                                      key.includes('skills') && value !== null && (
                                          <Stack key={key} direction={"row"}>
                                              <Typography variant="subtitle1">{capitalizeFirstLetter(key.split('_')[0])}</Typography>
                                              <Typography variant="subtitle1"> - </Typography>
                                              {value?.map((item, i) => (
                                                  <Typography key={i} variant="subtitle1">{item.skill}, </Typography>
                                              ))}
                                          </Stack>
                                      )
                                  ))}
                            </List>
                        </Grid>
                    }
        </Grid>
        }
        {/* End Background Section */}
        <Grid container item xs={12} justifyContent={"center"} sx={{ paddingBottom: '5px'}}>
            <Button size="large" onClick={setCharacter}>Create</Button>
        </Grid>
        
        </Grid>
    </Paper>
    

  );
}

export default CharacterCreate;
