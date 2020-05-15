const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Handling uncaught exceptions globally
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 😶');
});

//using the dotenv variable
dotenv.config({ path: './config.env' });

const app = require('./app');


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(result => {
    console.log('DB Connected successfully🎉')
})

// console.log(process.env);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


//Handling unhandled rejection globally
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
});
