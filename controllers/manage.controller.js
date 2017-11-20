var Information = require('./../models/information.model');
var tcpp = require('tcp-ping');


var ping_host = (arrDevice) => {
    var information = {
            MAC: arrDevice._id,
            IP: arrDevice.IP,
            name: arrDevice.name,
            status: "",
            data:{},
            location: arrDevice.location,
            fail: 0,
        };

    return new Promise((resolve, reject) => {
        tcpp.ping({ address: arrDevice.IP }, (err, data) => {
            if (err) {                
                return reject(err);
            }
            information.data=data;
            return resolve(information);
        });
    })
}

var testConnect = (information) => {    
    information.data.results.forEach((result) => {
        if (result.err) information.fail++;
    });
    return Promise.resolve(information);
}

var sendConnect = (information) =>{
        return Promise.resolve(information);
}


module.exports = {
    ping: ping_host,
    testConnect: testConnect,
    sendConnect: sendConnect
}


