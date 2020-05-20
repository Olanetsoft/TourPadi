const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');


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

//Import data to DB
const importAllData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data loaded successfully")

    } catch (err) {
        console.log(err)
    }
    process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data deleted successfully");

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