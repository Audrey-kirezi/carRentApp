const mongoose= require("mongoose")
const Schema= mongoose.Schema

const carSchema = new Schema({
    carModel: String,
    carImageUrl: String,
    price: Number,
  });
const adminSchema= new Schema({
    username:{
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
        required:true,
    },
    cars:[carSchema],

})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin