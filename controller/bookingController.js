//requiring stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//import the AppError class
const AppError = require('./../utils/appError');

//importing tour model
const Tour = require('../models/tourModel');

//importing user model
const User = require('../models/userModel');


//importing booking model
const Booking = require('../models/bookingModel');

//import handlerFactory
const factory = require('./handlerFactory');



exports.getCheckoutSession = async (req, res, next) => {
    try {
        //1) Get the currently booked tourModel
        const tour = await Tour.findById(req.params.tourID);

        //2) Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            // success_url: `${req.protocol}://${req.get('host')}/?tour=${
            //     req.params.tourID}&user=${req.user.id}&price=${tour.price}`,

            success_url: `${req.protocol}://${req.get('host')}/`,
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


// exports.createBookingCheckout = async (req, res, next) => {
//     //This is temporary because its un secure and everyone can make bookings without paying
//     try {
//         const { tour, user, price } = req.query;

//         //if it doesnt exist then go to the next middleware
//         if (!tour && !user && !price) return next();

//         await Booking.create({
//             tour, user, price
//         });

//         //redirecting to homepage
//         res.redirect(req.originalUrl.split('?')[0]);

//     } catch (err) {
//         next(new AppError('Unable to create booking', 404));
//     };
// };



//create a function to handle booking
// const createBookingCheckout = async session => {
//     //the tour
//     const tour = session.client_reference_id;

//     const user = (await User.findOne({ email: session.customer_email })).id;

//     const price = session.line_items[0].amount / 100;
//     await Booking.create({
//         tour, user, price
//     });
// };



//handler for stripe webhook-checkout
// exports.webhookCheckout = (req, res, next) => {
//     const signature = req.headers['stripe-signature'];
//     let event;
//     try {
//         event = stripe.webhooks.constructEvent(
//             req.body,
//             signature,
//             process.env.STRIPE_WEBHOOK_SECRET
//         )
//     } catch (err) {
//         return res.status(400).send(`Webhook error: ${err.message}`);
//     }

//     if (event.type === 'checkout.session.completed')
//         createBookingCheckout(event.data.object);
//     res.status(200).json({
//         received: true
//     });
// };

exports.createBooking = factory.createOneDocument(Booking)
// exports.getBooking = factory.createOneDocument(Booking)
// exports.getAllBooking = factory.createOneDocument(Booking)
exports.updateBooking = factory.updateOneDocument(Booking)
exports.deleteBooking = factory.deleteOneDocument(Booking)