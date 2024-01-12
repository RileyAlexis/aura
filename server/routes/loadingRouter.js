const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/character', (req,res) => {
    if (req.isAuthenticated()) {
        
        const userId = req.user.id;
        let queryString = `SELECT * from "character_stats" WHERE "userId" = $1`;

        pool.query(queryString, [userId])
            .then((response) => {
                let data = {
                    name: response.rows[0].name,
                    stats: {
                        Strength: response.rows[0].strength,
                        Agility: response.rows[0].agility,
                        Creativity: response.rows[0].creativity,
                        Energy: response.rows[0].energy,
                        Speed: response.rows[0].speed,
                        Education: response.rows[0].education,
                        Rejection: response.rows[0].rejection,
                        Charisma: response.rows[0].charisma
                        },
                    skills: response.rows[0].skills
                }
                res.json(data);
            }).catch((error) => {
                console.error("Error loading character stats", error);
                res.sendStatus(500);
            });
    }
});

module.exports = router;