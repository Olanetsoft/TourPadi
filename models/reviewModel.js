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


//Adding this will make all the query automatically populate all the tour and user details
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'tour',
        //this was added not to show this field upon request
        select: 'name'
    }).populate({
        path: 'user',
        //this was added to show only this field upon request
        select: 'name photo'
    });
    next();
});

//define the Review Model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;