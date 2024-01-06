const express = require('express');
require('dotenv').config();
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const gemini = new GoogleGenerativeAI(process.env.GEMINI);

//Gemini API Call
router.get('/gemini', async (req, res) => {
    const model = gemini.getGenerativeModel({ model: "gemini-pro"});
    const prompt = req.query.prompt;    
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;