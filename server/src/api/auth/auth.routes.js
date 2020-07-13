//use jwt and bcrypt

const express = require('express');
const yup = require('yup');
const User = require('../users/users.model');
const bcrypt = require('bcrypt');
const jwt = require('../../../lib/jwt');

const router = express.Router();

const schema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .min(2)
    .required(),
    email: yup
    .string()
    .trim()
    .email().required(),
    password: yup
    .string()
    .min(8)
    .max(100)
    .matches(/[^A-Za-z0-9]/, 'Must contain a special character')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[0-9]/, 'Must contain a number').required()
    //uses regex to validate password: 
})

/*const validPassword = (password, username) => {
    return password.toLowerCase() != username.toLowerCase() && 
};*/

router.post('/signup', async (req, res, next) => {

    const {email, password, name} = req.body;
    try {
        const user = {email, name, password};
        await schema.validate(user, {abortEarly: false});
        const existingUser = await User.query().where({email}).first();
        if(existingUser) {
            res.status(403);
            throw new Error('Email is already created with an account');
        } 
        const hashedPassword = await bcrypt.hash(password, 12);
        const insertedUser = await User.query().insert({name, email, password: hashedPassword})
        delete insertedUser.password;
        //rm password from insertedUser also never put private information in jwt token ie. password
        const payload = {
            id: insertedUser.id,
            name,
            email,
        }
        const token = await jwt.sign(payload)
        res.json(
            {     
               user: payload,
                token
            })
    } catch (error) {
        next(error);
    }
});


router.post('/signin', async (req, res, next) => {
   
   try{ 
       const {email, password} = req.body;
    await schema.validate({name: 'test', email, password}, {abortEarly: false});
    
    const user = await User.query().where({email}).first();
    if(!user) {
        res.status(403);
        throw new Error('Invalid Login');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        res.status(403);
        throw new Error('Invalid Login');
    }
    const payload = {
        id: user.id,
        name: user.name,
        email,
    }
    const token = await jwt.sign(payload)
    res.json(
        {     
           user: payload,
            token
        })
    
} catch(error) {
next(error)
}

});

module.exports = router;