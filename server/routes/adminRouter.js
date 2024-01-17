const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool'); 
const router = express.Router();

router.post('/loadBackGroundData', async (req,res) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
    const backgroundData = require('../gamedata/backgrounds.json');
    let insertedRecords = 0;
    let skippedRecords = 0;
try {
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

} catch (error) {
    console.error("Error inserting background Data", error);
    res.json({ message: "Error creating backgrounds" });
}
    } else {
        res.json({ message: "User not authorized. Contact system admin" });
    }
});

router.post('/loadLocationData', async (req, res) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
    const locationData = require('../gamedata/locations.json');
    console.log(req.user);
    let insertedRecords = 0;
    let skippedRecords = 0;

    //Add city location data
    try {
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
    } catch (error) {
        console.error("Error loading location data", error);
        res.json({ message: "Error loading locations" });
    }

} else {
    res.json({ message: "User not authorized. Contact system admin" })
}


});

module.exports = router;