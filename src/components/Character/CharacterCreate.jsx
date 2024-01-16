import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Grid, Paper, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, List, ListItem, ListItemText } from "@mui/material";
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

       if (checked) {
        setError('');
        const charObj = {
            name: name,
            background: selectedBackground.id,
            stats: selectedBackground.stats,
            skills: selectedBackground.skills,
            gameLocation: 0
            }

        await dispatch(setAllCharacterData(charObj));
        saveCharacter();
        } else if (!checked) {
            checkName();
        }
    }

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
                        <Grid item container xs={12} md={12} alignItems={"baseline"} justifyContent={"space-between"}>
                            <List dense disablePadding>
                                <Typography variant="h6">Stats:</Typography>
                            {Object.entries(selectedBackground.stats).map(([key, value]) => (
                                <ListItem key={key} disableGutters>
                                    <ListItemText>
                                        <Typography variant="body">{key} : {value}</Typography>
                                    </ListItemText>
                                </ListItem>                                 
                            ))}
                            </List>
                    
                            <List dense disablePadding>
                        <       Typography variant="h6">Skills:</Typography>
                                    {Object.entries(selectedBackground.skills).map(([key, value]) => (
                                        value.length > 0 && 
                                        <ListItem key={key}>
                                            <ListItemText>
                                                <Typography variant="body">
                                                    {key} : {value.map((item) => (
                                                    skillsets[key][item] + ' | '
                                                    ))}
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>        
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
