const express = require('express');

const router = express.Router();

const types = require('./itemTypes/itemType.routes');
const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');

router.get('/', (req, res) => {
    res.json({message: '🌍 Hello World 🌍',})
});

router.use('/auth', auth);

router.use('/types', types);

router.use('/users', users);

module.exports = router;