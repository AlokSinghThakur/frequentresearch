const mongoose = require('mongoose')
const states = new mongoose.Schema({
    id:{type:String},
    state:{type:String},
    country:{type:String}
});


module.exports = mongoose.model('states',states);

