//get the promisify methods
const { promisify } = require('util');

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
        });

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
    };

};

//handler for logging in user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //1.) Check if email and password exist
        if (!email || !password) {
            return next(new AppError('Please provide email and password! 🙄', 400));
        };

        //2.) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        //to compare the entered password and the userPassword
        //const correct = await user.correctPassword(password, user.password);

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password! 🙄', 401));
        }

        //3.)If everything is fine then send back token to client
        //using the jwt to create a signature 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });

        res.status(200).json({
            status: 'success',
            token
        });

    } catch{
        next(new AppError('Unable to login 🙄', 400))
    }

};

//protecting the route against not login user
exports.protect = async (req, res, next) => {
    try {
        let token;

        //1.) Get token and check if it exist
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

        }
        console.log(token)
        //Check if no token in the header and return 401 for non authorized
        if (!token) {
            return next(new AppError('Please Login to get access 😒', 401));
        }

        //2.) Verifying the token and use promisify function by node
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log(decoded)

        //3.) check if user exists

        //4.) check if user changed password after the token was issued

        next();
    } catch (err) {
        next(new AppError('Token or Authorization failed 😒', 401));
        // res.status(400).json({
        //     status: 'failed',
        //     message: err
        // });
        
    }
};