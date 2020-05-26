const mongoose = require('mongoose');



const bookingSchema = new mongoose.Schema({
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Booking must belong to a tour']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User']
    },
    price: {
        type: Number,
        require: [true, 'Booking must have a price']
    },
    paid: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


//populate user when theres is a query
bookingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'tour',
        //this was added not to show this field upon request
        select: 'name'
    });

});

//define the Booking Model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;