//requiring stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//import the AppError class
const AppError = require('./../utils/appError');

//importing tour model
const Tour = require('../models/tourModel');

//importing booking model
const Booking = require('../models/bookingModel');




exports.getCheckoutSession = async (req, res, next) => {
    try {
        //1) Get the currently booked tourModel
        const tour = await Tour.findById(req.params.tourID)

        //2) Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${req.protocol}://${req.get('host')}/?tour=${
                req.params.tourID}&user=${req.user.id}&price=${tour.price}`,
            cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
            customer_email: req.user.email,
            client_reference_id: req.params.tourID,
            line_items: [
                {
                    name: `${tour.name} Tour`,
                    description: tour.summary,
                    //this can only work with live images on prod, so lets use the natours.dev site
                    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                    //multiply by 100 to convert to cent
                    amount: tour.price * 100,
                    currency: 'usd',
                    quantity: 1
                }
            ]
        })

        //3) send it to client
        res.status(200).json({
            status: 'success',
            session
        })

    } catch (err) {
        next(new AppError('Cant checkout', 404))
    };
}


exports.createBookingCheckout = async (req, res, next) => {
    //This is temporary because its un secure and everyone can make bookings without paying
    try {
        const { tour, user, price } = req.query;

        //if it doesnt exist then go to the next middleware
        if (!tour && !user && !price) return next();

        await Booking.create({
            tour, user, price
        });

        //redirecting to homepage
        res.redirect(req.originalUrl.split('?')[0]);

    } catch (err) {
        next(new AppError('Unable to create booking', 404));
    };
};