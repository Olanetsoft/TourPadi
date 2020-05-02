const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

//using the dotenv variable
dotenv.config({ path: './config.env' });


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(result => {
    console.log('DB Connected successfully')
}).catch(err => {
    console.log(err)
});

//creating a module
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a tour must have a name']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: Number
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The Forest Hiker',
    price: 500
});

testTour.save()
.then(result =>{
    console.log('Data save successfully👍')
});

// console.log(process.env);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});