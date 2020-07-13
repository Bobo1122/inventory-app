const express = require('express');

const router = express.Router();

const types = require('./itemTypes/itemType.routes');


router.use('/types', types);

router.get('/', (req, res) => {
    res.json({message: '🌍 Hello World 🌍',})
});

module.exports = router;