const express = require('express');
const router = express.Router();
const { profanity, whitelistWord, blacklistWord } = require('super-profanity');

router.post('/check', (req, res) => {
    if (req.isAuthenticated()) {
    const checkit = profanity(req.body.text);
    console.log('Profane', checkit);
    if (checkit) {
        res.json({ message: 'Name contains blacklisted words or phrases'})
    } else if (!checkit) {
        res.json({ ok: "OK"});
    }
    
    } else res.send(403);
});

router.post('/blacklist', (req, res) => {
    if (req.isAuthenticated()) {
        blacklistWord(req.body.text);
    } else res.sendStatus(403);
});

router.post('/whitelist', (req, res) => {
    if (req.isAuthenticated()) {
        whitelistWord(req.body.text);
    } else res.sendStatus(403);
});

module.exports = router;