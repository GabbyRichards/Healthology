const mongoose = require('mongoose')

const Schema = mongoose.Schema

const healthSchema = new Schema({
    age:{
       type: Number,
       required: true
    },
    height:{
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Health', healthSchema)