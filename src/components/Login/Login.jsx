import { useState } from "react";
import axios from "axios";
import { Typography, TextField, Button } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");

  const processLogin = () => {
    const dataObj = {
      username: username,
      password: password,
    };

    axios
      .post("/user/login", dataObj)
      .then((response) => {
        console.log("Login Successful");
      })
      .catch((error) => {
        console.log("Error Logging in", error);
      });
  };

  const createNewUser = () => {
    console.log("create new user function called");
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
          console.log("User created successfully");
        })
        .catch((error) => {
          console.log("User creation not sucessful", error);
        });
    }
  };

  return (
    <div>
      {login && (
        <>
          <Typography variant="h4">User Login/Register</Typography>
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
          <br /> <br />
          <br />
          <div className="buttonBox">
            <Button variant="outlined" onClick={processLogin}>
              Log In
            </Button>
            <Button variant="outlined" onClick={(e) => setLogin(!login)}>
              New User
            </Button>
          </div>
          {error && (
            <Typography m={2} color="red" variant="body">
              {error}
            </Typography>
          )}
        </>
      )}

      {/* Create new user */}
      {!login && (
        <div>
          <Typography variant="body">
            Enter username and create a password:
          </Typography>
          <br /> <br />
          <br />
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
          <br /> <br />
          <br />
          <div className="buttonBox">
            <Button variant="outlined" onClick={createNewUser}>
              Create New User
            </Button>
            <Button variant="outlined" onClick={(e) => setLogin(!login)}>
              Back
            </Button>
          </div>
          {error && (
            <Typography m={2} color="red" variant="body">
              {error}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
