const mongoose = require('mongoose')
const countrys = new mongoose.Schema({
    key:{type:String},
});


module.exports = mongoose.model('countrys',countrys);

