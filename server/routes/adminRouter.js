const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool'); 
const router = express.Router();

let admin = false;

//Before allowing changes to game data the users admin status is verified by the DB
const checkRole = (userId) => {
    const queryString = `SELECT * FROM "users" WHERE "id" = $1`;

    pool.query(queryString, [userId])
        .then((response) => {
            console.log('Db Role', response.rows[0].role);
            if (response.rows[0].role === 'admin') { 
                admin = true;
            } else { 
                admin = false;
            }
            
        }).catch((error) => {
        console.log("Error verifying admin uyser", error);
        return false;
        })
}

//Loads the character backgrounds
router.post('/loadBackGroundData', async (req,res) => {
    if (req.isAuthenticated()) {   

    //Backgrounds data is stored in JSON on the server for extensibility
    const backgroundData = require('../gamedata/backgrounds.json');
    let insertedRecords = 0;
    let skippedRecords = 0;
try {
    await checkRole(req.user.id);
    if (admin) {

        for (let i = 0; i < backgroundData.length; i++) {
        const duplicateCheckQuery = {
        text: `SELECT * FROM "backgrounds" WHERE "title" = $1`,
        values: [backgroundData[i].title]
        };

        const duplicateResult = await pool.query(duplicateCheckQuery.text, duplicateCheckQuery.values);
        console.log('Duplicate Result', duplicateResult.rows.length, 'Title:', backgroundData[i].title);
        
        if (duplicateResult.rows.length > 0) {
            skippedRecords++;
        } else if(duplicateResult.rows.length === 0) {
            console.log('Not a duplicate, insert data');
            
            const insertQuery = {
                text: `INSERT INTO "backgrounds" ("title", "description", "stats", "skills")
                    VALUES ($1, $2, $3, $4);`,
                values: [ backgroundData[i].title, backgroundData[i].description, backgroundData[i].stats, backgroundData[i].skills ]
            };

            pool.query(insertQuery.text, insertQuery.values);
            insertedRecords++;
        } // end else
} //End for loop
    
res.json({ message: `${insertedRecords} new backgrounds added. ${skippedRecords} duplicates skipped` });
    } else {
        res.json({ message: "User not authorized. Contact system admin" });

    }
} catch (error) {
    console.error("Error inserting background Data", error);
    res.json({ message: "Error creating backgrounds" });
}
    } else {
        res.json({ message: "User not authorized. Contact system admin" });
    }

});

//Loads the game location data
router.post('/loadLocationData', async (req, res) => {

    if (req.isAuthenticated()) {

    //Location data is stored in JSON on the server for extensibility
    const locationData = require('../gamedata/locations.json');
    let insertedRecords = 0;
    let skippedRecords = 0;

    //Add city location data
    try {
        await checkRole(req.user.id);
        if (admin) {
        for (let i = 0; i < locationData.city.length; i++) {
            const duplicateCheckQuery = {
                text: `SELECT * FROM "locations" WHERE "title" = $1`,
                values: [locationData.city[i].title]
                };
        
                const duplicateResult = await pool.query(duplicateCheckQuery.text, duplicateCheckQuery.values);
                console.log('Duplicate Result', duplicateResult.rows.length, 'Title:', locationData.city[i].title);
                
                if (duplicateResult.rows.length > 0) {
                    skippedRecords++;
                } else if(duplicateResult.rows.length === 0) {
                    console.log('Not a duplicate, insert data');
                    
                    const insertQuery = {
                        text: `INSERT INTO "locations" ("meta", "title", "description")
                            VALUES ($1, $2, $3);`,
                        values: [ "city", locationData.city[i].title, locationData.city[i].description ]
                    };
        
                    pool.query(insertQuery.text, insertQuery.values);
                    insertedRecords++;
                } // end else
        } //End for loop
        
        res.json({ message: `${insertedRecords} new locations added. ${skippedRecords} duplicates skipped` });
    } else {
    res.json({ message: "User not authorized. Contact system admin" })

    }
    } catch (error) {
        console.error("Error loading location data", error);
        res.json({ message: "Error loading locations" });
    }

} else {
    res.json({ message: "User not authorized. Contact system admin" })
}


});

module.exports = router;