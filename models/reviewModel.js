const mongoose = require('mongoose');

//importing the tour model
const Tour = require('./tourModel');

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

//instance methods
//Adding this will make all the query automatically populate all the tour and user details
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        //this was added to show only this field upon request
        select: 'name photo'
    });
    // this.populate({
    //     path: 'tour',
    //     //this was added not to show this field upon request
    //     select: 'name'
    // }).populate({
    //     path: 'user',
    //     //this was added to show only this field upon request
    //     select: 'name photo'
    // });
    next();
});


//static methods
//to calculate the average review rating upon new review submission
reviewSchema.statics.calcAverageRatings = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: '$tour',
                nRatings: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    // console.log(stats)
    //update the review on current tour
    if(stats.length > 0){
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].nRatings,
            ratingsAverage: stats[0].avgRating
    
        })
    }else{
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
    
        });
    }
    
};
//to update it when a new review is created
reviewSchema.post('save', function (next) {
    //this points to current review
    this.constructor.calcAverageRatings(this.tour);

});


//To update review
//REMEMBER: findByIdAndUpdate is a shorthand for findOneAndUpdateById
reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
});


//To update review
//REMEMBER: findByIdAndUpdate is a shorthand for findOneAndUpdateById
reviewSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcAverageRatings(this.r.tour);
});




//define the Review Model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;