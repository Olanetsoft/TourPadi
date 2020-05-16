//using the json web token
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.signup = async (req, res, next) => {
    try{
        //create new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        //using the jwt to create a signature 
        const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        })

        res.status(201).json({
            status: 'Success',
            token,
            data: {
                newUser
            }
        });

    }catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

};