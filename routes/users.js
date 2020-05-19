const express = require('express');
const router = express.Router();

//import auth controller
const authController = require('../controller/authController');

//import user controller
const userController = require('../controller/usersControllers');


router.post('/api/v1/users/forgotPassword', authController.forgotPassword);

router.patch('/api/v1/users/resetPassword/:token', authController.resetPassword);

router.patch('/api/v1/users/updateMyPassword', authController.protect, authController.updatePassword);

router.patch('/api/v1/users/updateMe', authController.protect, userController.updateMe);

router.delete('/api/v1/users/deleteMe', authController.protect, userController.deleteMe);

router.post('/api/v1/users/login', authController.login);

router.post('/api/v1/users/signup', authController.signup);

router.get('/api/v1/users', userController.getAllUsers);

module.exports = router;