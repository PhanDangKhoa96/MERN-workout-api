require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// routes
app.use('/api/workout', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {

        // listen
        app.listen(process.env.PORT, (req, res) => {
            console.log('connect to db and Listening on port ', process.env.PORT)
        })
    })
    .catch((err) => { console.log(err) })

