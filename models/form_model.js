const mongoose = require('mongoose')
const form = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String },
    email: {type:String,unique: true },
    country:{type:String},
    state:{type:String},
    city:{type:String},
    gender:{type:String},
    dateOfBirth:{type:Date},
    monthOfBirth:{type:Date},
    yearOfBirth:{type:Date},
    age:{type:Number}
});


module.exports = mongoose.model('form',form);

