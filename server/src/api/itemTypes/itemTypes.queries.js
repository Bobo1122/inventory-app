const db = require('../../db');

const tableNames = require('../../../constants/tableNames');


module.exports = {
    getAllTypes() {
        return db(tableNames.item_type);
    },

}