const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../../gamedata');


async function createJSONFile(file) {
    const filePath = path.join(dataPath, file);    
    try {
     await fs.access(filePath);
    } catch (error) {
     await fs.writeFile(filePath, '[]');
    }
}

async function readJSONData(file) {
    const filePath = path.join(dataPath, file);    


    try {
        const existingData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(existingData);
    } catch (error) {
        throw new Error(`Error reading file:`, error);
    }
}

async function writeDataToJSON(file, data) {
    const filePath = path.join(dataPath, file);    

    try {
        await fs.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
        throw new Error(`Error writing file, ${filePath}`);

    }
}

module.exports =  { createJSONFile, readJSONData, writeDataToJSON }