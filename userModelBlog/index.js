const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT

// connect to the DB
require('./configs/dbConnection')

// async error handler
require('express-async-errors')

// parse JSON in body
app.use(express.json())

// use cookie-session middleware:
const session = require('cookie-session')
// cookie session middleware is used to store session data in a cookie
// it takes an object as an argument with a secret key
// the secret key is used to encrypt the session data
app.use(session({
    secret: process.env.SECRET_KEY
    // there are other options that can be used with cookie-session.
    // for example, maxAge, secure, httpOnly, etc.

    // this middleware will automatically add a session object to the request object
    // by extracting the session data from the cookie.
    // req.session.propertyName
}))

// userControl middleware:
app.use(require('./middleware/userControl'))

// Routes:
app.all('/', (req, res)=>{
    res.send('Welcome to the blog API.  Please use /blog or /users')
})

app.use('/blog', require('./routers/blog.router'))
app.use('/users', require('./routers/user.router'))


// Error handler:
app.use(require('./middleware/errorHandler'))

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})