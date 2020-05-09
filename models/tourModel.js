const mongoose = require('mongoose');

//creating a model
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a tour must have a name'],
        unique
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: Number
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;