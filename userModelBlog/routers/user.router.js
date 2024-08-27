const router = require('express').Router();
// import the user controller
const {User} = require('../controllers/user.controller')

// '/users

router.route('/')
    .get(User.list)
    .post(User.create)

    
router.route('/login')
.post(User.login) // when logging in we typically use a post request
// This is because we are sending data to the server.

router.all('/logout', User.logout)

// THE ORDER OF YOUR ROUTES IS VERY IMPORTANT!!!
// If you put the route /users/:id before /users/login or /users/logout,
// the server will think that login and logout are ids.
// And we will get an error becaus we're using the wrong request handler!!!

// To prevent this from happenning, we need to check for 
// /login and /logout before /:id!!!

router.route('/:id')
// id is a url parameter
    .get(User.read)
    .put(User.update)
    .patch(User.update)
    .delete(User.delete)




// if anyone tries to access a bad route, send a 404
router.all('*', (req, res)=>{
    res.status(404).send('Page not found')
})

module.exports = router;