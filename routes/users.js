const express = require('express');
const router = express.Router();



//import auth controller
const authController = require('../controller/authController');

//import user controller
const userController = require('../controller/usersControllers');


router.post('/api/v1/users/login', authController.login);

router.get('/api/v1/users/logout', authController.logout);

router.post('/api/v1/users/signup', authController.signup);

router.post('/api/v1/users/forgotPassword', authController.forgotPassword);

router.patch('/api/v1/users/resetPassword/:token', authController.resetPassword);


//To protect all the route after the ones listed above
//router.use(authController.protect);

router.get('/api/v1/users/me', authController.protect, userController.getMe, userController.getUser);

router.patch('/api/v1/users/updateMyPassword', authController.protect, authController.updatePassword);

router.patch('/api/v1/users/updateMe', authController.protect, userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);

router.delete('/api/v1/users/deleteMe', authController.protect, userController.deleteMe);


//Restricting all the routes below to only admin 
//router.use(authController.restrictTo('admin'));

router.patch('/api/v1/users/:id', authController.protect, authController.restrictTo('admin'), userController.updateUser);

router.delete('/api/v1/users/:id', authController.protect, authController.restrictTo('admin'), userController.deleteUser);

router.get('/api/v1/users', authController.protect, authController.restrictTo('admin'), userController.getAllUsers);

router.get('/api/v1/user/:id', authController.protect, authController.restrictTo('admin'), userController.getUser);




module.exports = router;