const express = require('express');
const queries = require('./itemTypes.queries');


const router = express.Router();



router.get('/', async (req, res) => {
    const types = await queries.getAllTypes();
res.json(types);
});

module.exports = router;