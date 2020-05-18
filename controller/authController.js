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
            role: req.body.role,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt
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
        };

        //console.log(token)
        //Check if no token in the header and return 401 for non authorized
        if (!token) {
            return next(new AppError('Please Login to get access 😒', 401));
        };

        //2.) Verifying the token and use promisify function by node
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


        //3.) check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exist', 401));
        };


        //4.) check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('User recently changed password! Please log in again.', 401))
        };


        //GRANT ACCESS TO ALL PROTECTED ROUTE
        //passing user from middleware to middleware
        req.user = currentUser
        next();

    } catch (err) {
        next(new AppError('Token or Authorization failed 😒', 401));
        // res.status(400).json({
        //     status: 'failed',
        //     message: err
        // });

    }
};


//To restrict certain route for example to check user role before delete action
exports.restrictTo = (...roles) => {
    return (req, res, next) => {

        //roles ['admin', 'lead-guide']
        //get the user role from the protect middleware where we passed req.user
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
    }
};


//Creating forgot password handler
exports.forgotPassword = async (req, res, next) => {

    try {
        //1) Get user base on the posted email
        const user = await User.findOne({ email: req.body.email });
        //verify if the user exists
        if(!user){
            return next(new AppError('There is no such user with the email address.', 404))
        };

        //2) Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        //set validateBeforeSave to false to deactivate all the validator in the schema
        await user.save({validateBeforeSave: false});


        //3)send it to user email

    } catch (err) {
        // next(new AppError('FOrgot password failed 😢', 404))
    }


};


//Creating reset password handler
exports.resetPassword = async (req, res, next) => {

};