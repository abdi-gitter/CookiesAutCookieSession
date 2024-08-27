// bring in user model:
const User = require('../models/user.model')

// bring in password encryption helper:
const pwEncrypt = require('../helpers/pwEncrypt')

module.exports.User = {
    // GET all users
    list: async (req, res) => {
        // if (req.user) {
        //     console.log(req.user)
        // }
        const data = await User.find()
        res.status(200).send({
            error: false,
            data: data
        })
    },
    // POST a new user
    create: async (req, res) => {
        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            body: req.body,
            data: data
        })
    },

    // methods for single users:
    // GET a single user
    read: async (req, res) => {
        const { id } = req.params
        const data = await User.findOne({ _id: id })
        res.status(200).send({
            error: false,
            data: data
        })
    },
    // PUT PATCH update a user
    update: async (req, res) => {
        const { id } = req.params
        // data
        const data = await User.updateOne({ _id: id }, req.body)
        // newData
        const newData = await User.find({ _id: id })
        res.status(202).send({
            error: false,
            body: req.body,
            data,
            newData
        })
    },
    // DELETE a user
    delete: async (req, res) => {
        const data = await User.deleteOne({ _id: req.params.id })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    },

    // LOGIN AND LOGOUT METHODS:
    login: async (req, res) => {
        const { email, password } = req.body
        console.log(email, password)
        // check if the user provided an email and a password.
        if (email && password) {
            // now that we know the user provided values for both email and password...
            // We need to look up the user in the database and make sure they eixst
            // Then we need to make sure the password also matches the user.
            const user = await User.findOne({ email })
            console.log(user)
            // Now this user object will be empty or it will have the user's data.
            // now I need to check that the user exists and that the password matches.
            if (user && user.password === String(pwEncrypt(password))) {
                // NOTES ON CONVERTING TO A STRING INSIDE pwEncrypt FILE!!!
                // The user provided valid credentials.
                // we can now authenticate the user as that valid user.
                req.user = user
                // now that we have a valid user,
                // we can store the user's data in our session
                // After this, we will send back a cookie to the user's browser.
                // This cookie will contain whatever data we want to store in the session.
                req.session.id = user._id // this is coming from the document.
                req.session.password = user.password // this is coming from the document.

                // I've just added 2 properties to the session object on the request obj.
                // Because we're using the cookie-session middleware,
                // When we add properties to the session object, the cookie-session
                // middleware will automatically store that data in a cookie.
                // these cookies will be sent in the header of the response.

                // If the user checks on a 'remember me' box, we can set the cookie
                // to expire in some amount of time.
                req.session.remindMe = req.body.remindMe
                req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 days

                // Generated a cookie.
                // Remember when we send our response, the cookie will automatically
                // be sent to the user's browser/client
            } else {
                // The user provided invalid credentials.
                // we can now send an error message.
                req.user = false
                req.session = null
            }
        }

        res.status(200).send({
            error: false,
            user: req.user
        })
    },

    logout: async (req, res) => {
        // All we do for logout is clear the session.
        req.session = null
        res.status(200).send({
            error: false,
            message: 'User logged out'
        })
    }


}