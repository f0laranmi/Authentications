const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const {isEmail} = require('validator')

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "Please provide an email address"],
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        minLength: [5, 'Minimum username length is 5'],
        maxLength: [15, 'Minimum username length is 15'],
    },
    password: {
        type: String,
        required: true,
        minLength: [7, 'Minimum password length is 7'],
    },
    profile: {
        type: String, 
        required: true,
        default: "https://static.thenounproject.com/png/4035892-200.png"
    }
    
},
{timestamps: true})



module.exports = mongoose.model('User', userSchema)
