//Cookies and Session
const express = require('express');
const app = express();
const port = 3000;

// use cookie-parser middleware:
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// just like JSON, we need to parse the cookie data.
// This is because a cookie is always just a string.

app.use((req ,res, next)=>{
    // Let's log the name property from the cookie
    console.log('Time:', Date.now());
    next();

})

app.get('/', (req, res) => {
    // get a name from a query parameter:
    let name = req.query.name? req.query.name : 'Guest';
    // write a custom cookie:
    res.cookie('name', 'tobi', { maxAge:999999, secure: true });
    // add the time to the cookie:
    res.cookie('time', Date.now(), { maxAge:999999, secure: true });
    res.cookie('userName', name, { maxAge:999999, secure: true });
    // the domain is set to the domain of the request url
        // This means the cookie is only accessible on the domain that created it.
    // the path is set to the path of the request url
      // This means the cookie is only sent to the path that created it.
    // exprires is set to the current time + maxAge
        // We set a property of maxAge, and the expires property is automatically set to the current time + maxAge
    // HTTPOnly makes it so that the cookie is not accessible via JavaScript
        // this means the cookie can only be modified by the server that created it
    // secure makes it so that the cookie is only sent over HTTPS

    // send cookie:
    res.send('Hello World!');
});

// route to read cookies:
app.get('/read', (req, res) => {
    // read the cookie:
    res.send({...req.cookies});
});

// Delete the cookies:
app.all('/delete', (req, res) => {
    // delete the cookie:
    res.clearCookie('userName');
    res.clearCookie('time');
    res.clearCookie('name');
    res.send('Cookies deleted');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
