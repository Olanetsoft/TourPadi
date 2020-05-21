const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty']

    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour.']

    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user 😦 ']
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
    );
    //to make the virtual show up when a request is made you need to enable it here in the schema
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // });

//define the Review Model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;