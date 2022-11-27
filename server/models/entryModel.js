const mongoose = require('mongoose')

const Schema = mongoose.Schema

const entrySchema = new Schema({
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
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Entry', entrySchema)