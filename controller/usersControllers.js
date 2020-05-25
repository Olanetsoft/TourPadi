//importing tour model
const User = require('../models/userModel');

//import AppError
const AppError = require('../utils/appError');

//import handlerFactory
const factory = require('./handlerFactory');


const multer = require('multer');
//require sharp
const sharp = require('sharp');

//creating a multer storage
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         const extension = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//     }
// });

const multerStorage = multer.memoryStorage();

//creating a multer filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! please upload only images', 400), false)
    };
};

//declaring multer upload to save all the file uploaded to a folder
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});



//for photo upload
exports.uploadUserPhoto = upload.single('photo')


//for resizing user photo
exports.resizeUserPhoto = (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    sharp(req.file.buffer).resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
    //call the next middleware in the stack
    next()
};



//create a function to filter fields
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    //looping through all the fields to check if its one of the allowed fields
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

//implementing get me endpoint
exports.getMe = async (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

//get a users
exports.getUser = async (req, res, next) => {
    try {
        const singleUser = await User.findById(req.params.id)

        //Or Tour.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                singleUser
            }
        });
    } catch (err) {

        //return error to check if user exist
        next(new AppError(`No user found with ID: ${req.params.id}`, 404));
        // res.status(404).json({
        //     status: "failed",
        //     message: err
        // });
    }
}

//Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        next(new AppError('Fetching all users failed 🙄', 400));
    }

};


//updating user Details
exports.updateMe = async (req, res, next) => {
    try {
        //1) create error if user POST password data
        if (req.body.password || req.body.passwordConfirm) {
            return next(new AppError('This route is not for password update. please use /updateMyPassword', 400))
        }


        //2) Filtered out unwanted fields names that are not allowed to be updated
        //create a filtered body by using the function filterObj
        const filteredBody = filterObj(req.body, 'name', 'email');

        //check if file upload is included for photo
        if (req.file) {
            filteredBody.photo = req.file.filename
        }


        //3) Update user DOCUMENT
        //now get the update users
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });


        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (err) {
        next(new AppError('Fail to update user data', 400));
        // res.status(404).json({
        //     status: "failed",
        //     message: err
        // });
    };
};


//create a delete me
exports.deleteMe = async (req, res, next) => {
    try {
        //find and update the active status to false
        await User.findByIdAndUpdate(req.user.id, { active: false });

        //SEND RESPONSE IN JSON
        res.status(204).json({
            status: 'success',
            data: null

        });
    } catch (err) {
        return next(new AppError('Unable to delete User', 400))
    }
};

exports.deleteUser = factory.deleteOneDocument(User);

exports.updateUser = factory.updateOneDocument(User);