const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool'); 
const router = express.Router();

router.get('/backgrounds', (req,res) => {
    if (req.isAuthenticated()) {
        let queryString = `SELECT * FROM "backgrounds";`;

        pool.query(queryString)
            .then((response) => {
                console.log('Get Backgrounds');
                res.send(response.rows);
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/gameLocations', (req, res) => {
    if (req.isAuthenticated()) {
        let queryString = `SELECT * FROM "locations";`;

        pool.query(queryString)
            .then((response) => {
                console.log('Get Locations');
                res.send(response.rows);
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/skillsets', (req, res) => {
    if (req.isAuthenticated()) {
        let queryString = `SELECT * FROm "skills";`;

        pool.query(queryString)
            .then((response) => {
                console.log('Get skills');
                res.send(response.rows);
            }).catch((error) => {
                console.error("error getting skillset data", error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})


module.exports = router;