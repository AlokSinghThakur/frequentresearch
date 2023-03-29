const mongoose = require('mongoose')
const citys = new mongoose.Schema({
    id:{type:String},
    city:{type:String},
    state:{type:String}
});


module.exports = mongoose.model('citys',citys);

