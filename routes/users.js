const express = require('express');
const router = express.Router();

//import auth controller
const authController = require('../controller/authController');

//import user controller
const userController = require('../controller/usersControllers');



router.post('/api/v1/users/login', authController.login);

router.post('/api/v1/users/signup', authController.signup);

router.post('/api/v1/users/forgotPassword', authController.forgotPassword);

router.patch('/api/v1/users/resetPassword/:token', authController.resetPassword);


//To protect all the route after the ones listed above
router.use(authController.protect);

router.patch('/api/v1/users/updateMyPassword', authController.updatePassword);

router.patch('/api/v1/users/updateMe', userController.updateMe);

router.patch('/api/v1/users/:id', userController.updateUser);

router.delete('/api/v1/users/deleteMe', userController.deleteMe);

router.delete('/api/v1/users/:id', userController.deleteUser);

router.get('/api/v1/users', userController.getAllUsers);

router.get('/api/v1/user/:id', userController.getUser);

router.get('/api/v1/users/me', userController.getMe, userController.getUser);


module.exports = router;