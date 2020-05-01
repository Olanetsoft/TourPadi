const dotenv = require('dotenv');
const app = require('./app');


//using the dotenv variable
dotenv.config({path: './config.env'})

// console.log(process.env);

app.listen('3000', () => {
    console.log('App running on port 3000');
});