const express = require('express');
const router = express.Router();


//import auth controller
const viewsController = require('../controller/viewsController');


router.get('/', viewsController.getOverview);

router.get('/tour/:slug', viewsController.tourDetail);


module.exports = router;