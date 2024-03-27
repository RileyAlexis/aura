const express = require('express');
require('dotenv').config();
const pool = require('../modules/pool');
const router = express.Router();
const fs = require('fs');

const fileops = require('./routeModules/writejson');
const passport = require('passport');

//Before allowing changes to game data the users admin status is verified by the DB
const checkRole = (userId) => {
    // const queryString = `SELECT * FROM "users" WHERE "id" = $1`;

    // pool.query(queryString, [userId])
    //     .then((response) => {
    //         console.log('Db Role', response.rows[0].role);
    //         if (response.rows[0].role === 'admin') { 
    //             return next();
    //         } else { 
    //             res.json({ message: "User does not have admin privleges" });
    //         }

    //     }).catch((error) => {
    //     console.log("Error verifying admin user", error);
    //     res.sendStatus(403);
    //     })
}

const checkAdminAuth = async (req, res, next) => {
    const queryString = `SELECT * FROM "users" WHERE "id" = $1`;
    console.log('auth', req.user);

    try {
        const response = await pool.query(queryString, [req.user.id])
        if (response.rows[0].role === 'admin') {
            return next();
        } else {
            res.json({ message: "User not authorized" })
        }
    } catch (error) {
        console.error("Error verifying admin user", error);
    }

};

const processBackgroundData = async (backgroundData) => {

    let insertedRecords = 0;
    let skippedRecords = 0;

    for (let i = 0; i < backgroundData.length; i++) {

        const duplicateCheckQuery = { text: `SELECT * FROM "backgrounds" WHERE "title" = $1`, values: [backgroundData[i].title] };

        try {

            const duplicateResult = await pool.query(duplicateCheckQuery.text, duplicateCheckQuery.values);
            console.log('Duplicate Result', duplicateResult.rows.length, 'Title:', backgroundData[i].title);

            if (duplicateResult.rows.length > 0) {
                skippedRecords++;
            } else if (duplicateResult.rows.length === 0) {
                console.log('Not a duplicate, insert data');

                const insertQuery = {
                    text: `INSERT INTO "backgrounds" ("title", "description", "stats", "basic_skills", "thieving_skills", "crime_skills", "network_skills",
                        "corporate_skills", "hardware_skills", "cybernetic_skills", "engineering_skills")
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
                    values: [
                        backgroundData[i].title,
                        backgroundData[i].description,
                        JSON.stringify(backgroundData[i].stats),
                        JSON.stringify(backgroundData[i].basic_skills),
                        JSON.stringify(backgroundData[i].thieving_skills),
                        JSON.stringify(backgroundData[i].crime_skills),
                        JSON.stringify(backgroundData[i].network_skills),
                        JSON.stringify(backgroundData[i].corporate_skills),
                        JSON.stringify(backgroundData[i].hardware_skills),
                        JSON.stringify(backgroundData[i].cybernetic_skills),
                        JSON.stringify(backgroundData[i].engineering_skills)
                    ]
                };

                pool.query(insertQuery.text, insertQuery.values);
                insertedRecords++;
            } // end else
        } catch (error) {
            console.error('Error running query');
            throw error;
        }
    } //End for loop
    return { insertedRecords: insertedRecords, skippedRecords: skippedRecords }
};


const processLocationData = async (locationData) => {
    let insertedRecords = 0;
    let skippedRecords = 0;

    for (let i = 0; i < locationData.city.length; i++) {
        const duplicateCheckQuery = { text: `SELECT * FROM "locations" WHERE "title" = $1`, values: [locationData.city[i].title] };

        try {
            const duplicateResult = await pool.query(duplicateCheckQuery.text, duplicateCheckQuery.values);
            console.log('Duplicate Result', duplicateResult.rows.length, 'Title:', locationData.city[i].title);

            if (duplicateResult.rows.length > 0) {
                skippedRecords++;
            } else if (duplicateResult.rows.length === 0) {
                console.log('Not a duplicate, insert data');

                const insertQuery = {
                    text: `INSERT INTO "locations" ("meta", "title", "description")
                            VALUES ($1, $2, $3);`,
                    values: ["city", locationData.city[i].title, locationData.city[i].description]
                };

                pool.query(insertQuery.text, insertQuery.values);
                insertedRecords++;
            } // end else
        } catch (error) {
            console.error("Error running query");
            throw error;
        }
    } //End for loop
    return { insertedRecords: insertedRecords, skippedRecords: skippedRecords }
}

const processSkillsetData = async (skillsetData) => {
    let insertedRecords = 0;
    let skippedRecords = 0;

    for (let i = 0; i < skillsetData.length; i++) {

        const duplicateCheckQuery = { text: `SELECT * FROM "skills" WHERE "skill" = $1`, values: [skillsetData[i].skill] };
        const duplicateResult = await pool.query(duplicateCheckQuery.text, duplicateCheckQuery.values);
        console.log('Duplicate Result', duplicateResult.rows.length, 'Title:', skillsetData[i].skill);

        try {
            const duplicateResult = await pool.query(duplicateCheckQuery.text, duplicateCheckQuery.values);
            console.log('Duplicate Result', duplicateResult.rows.length, 'Title:', skillsetData[i].skill);

            if (duplicateResult.rows.length > 0) {
                skippedRecords++;
            } else if (duplicateResult.rows.length === 0) {
                console.log('Not a duplicate, insert data');

                const insertQuery = {
                    text: `INSERT INTO "skills" ("category", "skill", "available_levels", "points_per_level")
                                            VALUES ($1, $2, $3, $4);`,
                    values: [skillsetData[i].category, skillsetData[i].skill, skillsetData[i].available_levels, skillsetData[i].points_per_level]
                };

                pool.query(insertQuery.text, insertQuery.values);
                insertedRecords++;
            } // end else
        } catch (error) {
            console.error("Error running query");
            throw error;
        }
    } //End for loop

    return { insertedRecords: insertedRecords, skippedRecords: skippedRecords }
}

// ******************** ROUTES ***************************

//Loads the character backgrounds
router.post('/loadBackGroundData', checkAdminAuth, async (req, res) => {
    try {
        const backgroundData = require('../gamedata/backgrounds.json');
        const { insertedRecords, skippedRecords } = await processBackgroundData(backgroundData);
        res.json({ message: `Background Data - Inserted: ${insertedRecords} - Duplicates: ${skippedRecords}` })
    } catch (error) {
        res.json({ message: "Error inserting background data" });
    }
});

//Loads the game location data
router.post('/loadLocationData', checkAdminAuth, async (req, res) => {
    try {
        const locationData = require('../gamedata/locations.json');
        const { insertedRecords, skippedRecords } = await processLocationData(locationData);
        res.json({ message: `Locations Data - Inserted: ${insertedRecords} - Duplicates: ${skippedRecords}` })
    } catch (error) {
        res.json({ message: "Error inserting location data" });
    }
});

router.post('/loadSkillSetData', checkAdminAuth, async (req, res) => {
    try {
        const skillsetData = require('../gamedata/skillsets.json');
        const { insertedRecords, skippedRecords } = await processSkillsetData(skillsetData);
        res.json({ message: `Skillset Data - Inserted: ${insertedRecords} - Duplicates: ${skippedRecords}` })
    } catch (error) {
        res.json({ message: "Error inserting location data" });
    }
});

router.post('/testJSON', checkAdminAuth, async (req, res) => {
    const data = { property1: 'test', property2: "test2" };

    await fileops.createJSONFile('data.json');
    let parsedData = [];
    try {
        parsedData = await fileops.readJSONData('data.json');
    } catch (readError) {
        console.error('Error reading JSON file', readError);
    } finally {
        parsedData.push(data);
    }

    try {
        await fileops.writeDataToJSON('data.json', parsedData);
        res.json({ message: 'Data appended successfully' });
    } catch (error) {
        console.error('Error writing data', error);
        res.json({ message: 'Error writing to JSON file' });
    }
})



module.exports = router;