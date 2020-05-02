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


// console.log(process.env);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});