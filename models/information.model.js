var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _status = require('./../constant').STATUSORDER;

var informationSchema = new Schema({
    MAC: {
        type: String,
        required: true
    },
    IP:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    fail:{
        type: Number
    }
    
});

var Information = mongoose.model('Information', informationSchema);

module.exports = Information;