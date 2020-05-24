const express = require('express');
const router = express.Router();


//import authentication controller module
const authController = require('../controller/authController');

//import auth controller
const viewsController = require('../controller/viewsController');

//protect for isLoggedIn
router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);

router.get('/tour/:slug', viewsController.tourDetail);

router.get('/login', viewsController.loginUser);


module.exports = router;