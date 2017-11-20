var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _status = require('./../constant').STATUSORDER;

var deviceSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    IP: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },    
    location: {
        type: String
    }
    
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;