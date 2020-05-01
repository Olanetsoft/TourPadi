const dotenv = require('dotenv');
const app = require('./app');


//using the dotenv variable
dotenv.config({path: './config.env'})

// console.log(process.env);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});