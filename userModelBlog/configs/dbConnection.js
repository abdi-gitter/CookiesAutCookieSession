const mongoose = require('mongoose');
// Bring in the DB from .env
mongoose.connect(process.env.MONGODB)
.then(()=>console.log('DB connected...'))
.catch(err=>console.log('DB Connection Error: ', err))