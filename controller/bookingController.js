//requiring stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//import the AppError class
const AppError = require('./../utils/appError');

//importing tour model
const Tour = require('../models/tourModel');




exports.getCheckoutSession = async (req, res, next) => {
    try {
        //1) Get the currently booked tourModel
        const tour = await Tour.findById(req.params.tourID)

        //2) Create checkout session
        stripe.checkout.session.create({
            payment_method_types: ['card'], 
            success_url: `${req.protocol}://${req.get('host')}/`,
            cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`
        })

        //3) send it to client
    } catch (err) {
        next(new AppError('Cant checkout', 404))
    }

}