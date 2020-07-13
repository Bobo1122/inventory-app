const { Model } = require('objection');
const tableName = require('../../../constants/tableNames');
const schema = require('./users.schema.json');


class User extends Model {
    static get tableName() {
        return tableName.user;
    };
//creating a schema

static get jsonSchema(){
    return schema;
};

/*
    static get relationMappings() {
        return {
            children: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from:'',
                    to: ''
                },

            }
        }
    };*/

}

module.exports = User;