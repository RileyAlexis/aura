const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
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
            JSON.stringify(req.body.skills)
        ];

        let queryString = `SELECT 1 FROM "character_stats" WHERE userId = $1`;

            pool.query(queryString, [req.body.userId])
                .then((result) => {
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
                                            "skills" = $11
                                            WHERE userId = $1;`;
                    } else {
                        queryString = `INSERT INTO "character_stats'
                                        ("userId", "name", "strength", "agility", "creativity", "energy", "speed", "education", "rejection", "charisma", "skills")
                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
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