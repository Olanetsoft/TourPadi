const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


//creating a model
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal 40 characters🤦‍♀️'],
        minlength: [10, 'A tour name must have more or equal 40 characters🤦‍♀️'],

        //using the validator installed
        //validate: [validator.isAlpha, 'Tour name must only contain characters 🙄']
    },
    slug: String,
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
        required: [true, 'A tour must have a Difficulty 😥'],
        //to validate the allowed values
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either easy, medium or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price 😥']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                //this wont work on update, only works on new document
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below the regular price'
        }
    },
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
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    },
    //GeoJSON to specify the geolocation data
    startLocation: {
        //GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    ]
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


//DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

//define the Tour Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;