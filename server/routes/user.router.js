const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});


router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" (username, password, role)
    VALUES ($1, $2, $3) RETURNING id`;
  pool.query(queryText, [username, password, "player"])
    .then((response) => {

      const newUser = {
        id: response.rows[0].id,
        username: username,
        password: password,
        role: 'player'
      };
      // console.log('userId', response.rows[0].id);
      //Creates the session
      req.login(newUser, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });

      res.send({ userId: response.rows[0].id, username: username })
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});


router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log('Login Call made', req.user);
  const dataObj = {
    userId: req.user.id,
    username: req.user.username,
    role: req.user.role
  }

  res.send(dataObj);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/check-token', (req, res) => {
  console.log("check-token route called");
  if (req.isAuthenticated()) {
    // console.log("Authenticated", req.user);
    const dataObj = {
      userId: req.user.id,
      username: req.user.username,
      role: req.user.role
    }

    res.send(dataObj);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
