const jwt = require('jsonwebtoken');

function sign(payload) {
    return new promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1hr',
            }, (error, token) => {
                if(error) return reject(error);
                return resolve(token);
        });     
    });
}

module.exports = {
    sign,
};