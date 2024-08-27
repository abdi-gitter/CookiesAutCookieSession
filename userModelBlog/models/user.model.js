const mongoose = require('mongoose')
// require our password encryption module
const encrypt = require('../helpers/pwEncrypt')

// SCHEMA!!!
const UserSchema = new mongoose.Schema({
    // We need to validate the email...
    email: {
        type: String,
        trim: true,
        unique: true,
        // required can also be an array.
        required: [true, 'Email is required'],
        // We need to validate the email...
        // validate can also be an array.
        validate: [
            (email) => (email.includes('@') && email.includes('.')),
            'Email is not valid'
        ],
        // immutable means the value cannot be changed once it is set.
        immutable: true
    },
    // We need to encrypt the password...
    password: {
        type: String,
        trim: true,
        required: true,
        set: (pw) => encrypt(pw)
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    }
}, {
    collection: 'users',
    timestamps: true
})

// with mongoose, we also have access to hooks.
// Hooks are like middleware.
// we can run/exectute code before or after certain events.

// pre is for hooks that run before an event
// post is for hooks that run after an event

// Pre-update hook to throw an error if user tries to change email
function checkImmutableEmail(next) {
    console.log('preparing to run updateOne')
    const update = this.getUpdate();
    // this references the document being updated.
    // this.getUpdate gets the update object.  
    // This is the object that is being sent to the database.

    // update.$set is an object that contains the fields that are being updated.
    // We need to check if the email is being updated.
    if (update.$set && update.$set.email) {
        console.log('Email cannot be changed');
        return next(new Error('Email cannot be changed'));
    }
    if (update.email) {
        console.log('Email cannot be changed');
        return next(new Error('Email cannot be changed'));
    }
    next();
}

// pre-updateOne hook to throw an error if user tries to change email:
// events: updateOne, updateMany, findOneAndUpdate, save, insertMany, etc
UserSchema.pre('updateOne', checkImmutableEmail)
UserSchema.post('updateOne', (doc, next) => {
    console.log('updateOne ran')
    next()
})


module.exports = mongoose.model('User', UserSchema)

// example JSON:
// {
//     "email": "email@something.com",
//     "password": "password",
//     "firstName": "first",
//     "lastName": "last"
// }

