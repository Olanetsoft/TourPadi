const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');


//using the dotenv variable
dotenv.config({ path: './config.env' });


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(result => {
    console.log('DB Connected successfully🎉')
}).catch(err => {
    console.log(err)
});

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));



//Import data to DB
const importAllData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        console.log("All Data loaded successfully")

    } catch (err) {
        console.log(err)
    }
    process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log("All Data deleted successfully");

    } catch (err) {
        console.log(err)
    }
    //to exit the command
    process.exit();
};

if (process.argv[2] === '--import') {
    importAllData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

//command to use
//node ./dev-data/data/import-data.js --delete