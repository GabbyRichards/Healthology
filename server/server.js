require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const healthRoutes = require('./routes/healthData')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
console.log(req.path, req.method)
next()
})

app.use('/api/healthData', healthRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })