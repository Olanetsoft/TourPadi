const mongoose = require('mongoose');
const validator = require('validator');

//importing bcrypt
const bcrypt = require('bcrypt');


//name,email,photo,password,passwordConfirm

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please tell us your name 🤦‍♀️'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email 😥'],
        unique: true,
        lowercase: true,
        //using the validator installed
        validate: [validator.isEmail, 'Please provide a valid email 🙄']
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user' 
    },
    password: {
        type: String,
        required: [true, 'Please provide a password 😥'],
        minlength: [8, 'Please provide a password with minimum length of 8 😥'],
        //make the password never show up for any get request
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password 😥'],

        //To confirm and compare the password and the confirmPassword
        //This only work on save!!!
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password are not the same'
        }
    },
    passwordChangedAt: Date
});


//encrypting password
//using document middleware
userSchema.pre('save', async function (next) {
    //only run the function if password was modified
    if (!this.isModified('password')) {
        return next();
    };

    //taking the current password in this document
    this.password = await bcrypt.hash(this.password, 12);

    //deleting the passwordConfirm field because we don't want it to persist in the db
    this.passwordConfirm = undefined;

    next();
});


//creating an instance method that is going to be available on all document on a certain collection
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


//check if user changed password after the token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);

        //console.log(this.passwordChangedAt, JWTTimestamp);
        return JWTTimestamp < changedTimeStamp; //100 < 200
    };

    //False means NOT changed
    return false;
};


//define the Tour Model
const User = mongoose.model('User', userSchema);

module.exports = User;