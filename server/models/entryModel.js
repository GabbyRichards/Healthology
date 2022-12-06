const mongoose = require('mongoose')

const Schema = mongoose.Schema

//creates the entry schema for MongoDB
//ensures that the user can only enter numbers and strings
//all fields are required in order for there to be an entry
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