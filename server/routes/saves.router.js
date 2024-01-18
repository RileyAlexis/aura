const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/character', (req, res) => {
    if (req.isAuthenticated()) {
        console.log("Background", req.body.background);
        let dataArr = [
            req.body.userId,
            req.body.name,
            req.body.strength,
            req.body.agility,
            req.body.creativity,
            req.body.energy,
            req.body.speed,
            req.body.education,
            req.body.rejection,
            req.body.charisma,
            req.body.life,
            req.body.alive,
            JSON.stringify(req.body.basic_skills),
            JSON.stringify(req.body.thieving_skills),
            JSON.stringify(req.body.crime_skills),
            JSON.stringify(req.body.network_skills),
            JSON.stringify(req.body.corporate_skills),
            JSON.stringify(req.body.hardware_skills),
            JSON.stringify(req.body.cybernetic_skills),
            JSON.stringify(req.body.engineering_skills),
            req.body.background,
            req.body.coins
        ];

        console.log(req.body);

        let queryString = `SELECT 1 FROM "character_stats" WHERE "userId" = $1`;

            pool.query(queryString, [req.body.userId])
                .then((result) => {
                    console.log(result.rows.length);
                    if (result.rows.length > 0) {
                        queryString = `UPDATE "character_stats" 
                                        SET "name" = $2,
                                            "strength" = $3,
                                            "agility" = $4,
                                            "creativity" = $5,
                                            "energy" = $6,
                                            "speed" = $7,
                                            "education" = $8,
                                            "rejection" = $9,
                                            "charisma" = $10,
                                            "life" = $11,
                                            "alive" = $12,
                                            "basic_skills" = $13,
                                            "thieving_skills" = $14,
                                            "crime_skills" = $15,
                                            "network_skills" = $16,
                                            "corporate_skills" = $17,
                                            "hardware_skills" = $18,
                                            "cybernetic_skills" = $19,
                                            "engineering_skills" = $20,                                            
                                            "background" = $21,
                                            "coins" = $22
                                            WHERE "userId" = $1;`;
                    } else {
                        queryString = `INSERT INTO "character_stats"
                                        ("userId", "name", "strength", "agility", "creativity", "energy", "speed", "education", "rejection", "charisma", 
                                        "life", "alive", "basic_skills", "thieving_skills", "crime_skills", "network_skills", "corporate_skills", "hardware_skills",
                                        "cybernetic_skills", "engineering_skills", "background", "coins")
                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);`;
                    } //End user ID if statement

                    pool.query(queryString, dataArr)
                        .then((result) => {
                            res.sendStatus(200);
                        }).catch((error) => {
                            console.log("Error saving character", error);
                            res.sendStatus(500);
                        })
                }).catch((error) => {
                    console.error("Error querying user", error);
                    res.sendStatus(500);
                });

    } else {
        res.sendStatus(403);    
        } //End if isAuthenticated() statement

    });


module.exports = router;