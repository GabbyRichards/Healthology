const mongoose = require('mongoose')
//hashing function
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

//creates the user schema for MongoDB
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//signup method
userSchema.statics.signup = async function(email, password) {
    
    //validation
    if (!email || !password){
        throw Error('All fields must be filled.')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough.')
    }

    const exists = await this.findOne({email})

    //if the input email already exists, require the user to enter another email
    if (exists){
        throw Error('Email already in use.')
    }

    //make salt
    const salt = await bcrypt.genSalt(10)
    //hash password and salt together
    const hash = await bcrypt.hash(password, salt)

    //creates new document in MongoDB with email and hashed password
    const user = await this.create({ email, password: hash})

    return user
}

//login method
userSchema.statics.login = async function(email, password) {
    //if either of the authentication fields are empty, throw an error
    if (!email || !password){
        throw Error('All fields must be filled.')
    }

    //find the user based on their email address
    const user = await this.findOne({email})

    //if the user's email does not exist, throw an error statement
    if (!user){
        throw Error('Incorrect email.')
    }

    //compare the user's entered password with the password stored in MongoDB at the given email address
    const match = await bcrypt.compare(password, user.password)

    //if the passwords do not match, throw an error
    if (!match) {
        throw Error('Incorrect password.')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)