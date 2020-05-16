//importing tour model
const User = require('./../models/userModel');

//import AppError
const AppError = require('./../utils/appError')

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success 🙌',
            result: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        next(new AppError('Fetching all users failed 🙄', 400));
    }

};