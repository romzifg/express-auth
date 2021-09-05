const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);

// Connect DB MongoDB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server running')
        });
    })
    .catch(err => console.log(err))
