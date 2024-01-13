import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

//Material UI
import { Typography, TextField, Button, Paper, Box, Grid } from "@mui/material";

import { setUserData } from "../../modules/reducers/userStats";
import { setLocation } from "../../modules/reducers/character";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const processLogin = () => {
    const dataObj = {
      username: username,
      password: password,
    };
    axios
      .post("/user/login", dataObj)
      .then((response) => {
        console.log("Login Successful", response.data);
        dispatch(setUserData(response.data));
        dispatch(setLocation('0'));
      })
      .catch((error) => {
        console.log("Error Logging in", error);
      });
  };

  const createNewUser = () => {
    console.log("create new user function called");
    if (!username) {
      setError("Enter a username");
      return;
    }
    if (!password) {
      setError("Enter a password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (password === confirmPassword) {
      const dataObj = {
        username: username,
        password: password,
      };

      axios
        .post("user/register/", dataObj)
        .then((response) => {
          console.log("User created successfully", response.data);
          dispatch(setUserData(response.data));
          dispatch(setLocation('0'));
        })
        .catch((error) => {
          console.log("User creation not sucessful", error);
        });
    }
  };

  return (
    <Paper square={false}>

      {/* *********** LOGIN Secion ********************** */}
      {login && (
              <Grid container rowSpacing={2} columnSpacing={2} justifyContent={"space-around"}>
                <Grid item sm={12}>
                  <center>
                  <Typography variant="h4">User Login</Typography>
                  </center>
                  </Grid>
                  <Grid item sm={12}>
                    <center>
                  <TextField
                    variant="filled"
                    label="Email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    variant="filled"
                    label="Password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  </center>
                </Grid>
          <Grid item sm={12}>
            <center>
            <Button variant="outlined" onClick={processLogin}>
              Log In
            </Button>
            <Button variant="outlined" onClick={(e) => setLogin(!login)}>
              New User
            </Button>
            </center>
            </Grid>
          
            <Grid item sm={12} sx={{ padding: '12px' }}>
          {error && (
            <center>
            <Typography m={2} color="error" variant="body">
              {error}
            </Typography>
            </center>
          )}
          </Grid>
          </Grid>
      )}

      {/* *********** Create New User Secion ********************** */}
      {!login && (
         <Grid container rowSpacing={2} columnSpacing={2} justifyContent={"space-around"}>
          
          <Grid item sm={12}>
            <center>
              <Typography variant="h4">Enter email and create a password:</Typography>
            </center>
          </Grid>
          <Grid item sm={12}>
              <center>
                <TextField
                  variant="filled"
                  label="Email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="filled"
                  label="Password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  variant="filled"
                  label="Confirm Password"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </center>
              </Grid>
            <Grid item sm={12}>
              <center>
              <Button variant="outlined" onClick={createNewUser}>
                Create New User
              </Button>
              <Button variant="outlined" onClick={(e) => setLogin(!login)}>
                Back
              </Button>
              </center>
          </Grid>
          <Grid item sm={12} sx={{ padding: '12px' }}>
          {error && (
            <center>
            <Typography m={2} color="error" variant="body">
              {error}
            </Typography>
            </center>
          )}
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default Login;
