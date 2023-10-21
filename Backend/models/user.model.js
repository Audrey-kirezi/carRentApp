const mongoose= require("mongoose")
const { schema } = require("./admin.model")
const Schema= mongoose.Schema

const userSchema= new Schema({

    username:{
        type:String,
        required:true,
    },
    phone_number:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User