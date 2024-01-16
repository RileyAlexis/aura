const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool'); 
const router = express.Router();

router.get('/backgrounds', (req,res) => {
    if (req.isAuthenticated()) {
        let queryString = `SELECT * FROM "backgrounds";`;

        pool.query(queryString)
            .then((response) => {
                console.log('Get Backgrounds', response.rows);
                res.send(response.rows);
            }).catch((error) => {
                console.error(error);
            })
    } else {
        res.sendStatus(403);
    }
})






module.exports = router;