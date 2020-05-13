const mongoose = require('mongoose');

//creating a model
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name 🤦‍♀️'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration 😥']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a Group Size 😥']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a Difficulty 😥']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price 😥']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description 😥']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a Cover image 😥']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
},
    //to make the virtual show up when a request is made you need to enable it here in the schema
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

//to create a virtual document thats not literally in the DB
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

//define the Tour Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;