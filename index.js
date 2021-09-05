const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Connect DB MongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('connected to mongodb')
})

const authRoute = require('./routes/auth');

// Middleware
app.use('/api/user', authRoute);

app.listen(process.env.PORT, () => {
    console.log('Server running')
})