const express = require('express');
require('dotenv').config();
const router = express.Router();
const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// console.log(process.env.OPEN_AI_KEY);

const openai = new OpenAI({
apiKey: process.env.OPEN_AI_KEY
});
const gemini = new GoogleGenerativeAI(process.env.GEMINI);

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

router.get('/news', async (req, res) => {
    const prompt = req.query.prompt;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        })
        console.log(response);
        res.json({ response: response.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;