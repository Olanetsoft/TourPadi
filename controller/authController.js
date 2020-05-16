//using the json web token
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
//importing error class
const AppError = require('./../utils/appError');

//signup user
exports.signup = async (req, res, next) => {
    try {
        //create new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        //using the jwt to create a signature 
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        })

        res.status(201).json({
            status: 'Success',
            token,
            data: {
                newUser
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

};

//handler for logging in user
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    //1.) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password! 🙄', 400));
    }

    //2.) Check if user exists && password is correct
    const user = User.findOne({email});

    //3.)If everything is fine then send back token to client
    const token = '';

    res.status(200).json({
        status: 'success',
        token
    });
};