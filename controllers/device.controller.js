var Device = require('./../models/device.model');

function createDevice(device){
    if(device){
        return Device.create(device);
    }
    return Promise.reject({message: 'Device is null'});
};

function updateDevice(id,modifiedData){
    return Device.findByIdAndUpdate(id,modifiedData);
}

function removeDevice(id){
    return Device.findByIdAndRemove(id);
}

function getDeviceById(id){
    return Device.findById(id);
}

function find(query, currentPage, pageSize){
    currentPage = currentPage ||1;
    pageSize = pageSize || 30;
    return Device.find(query).sort({_id: 1});
}

module.exports = {
    create: createDevice,
    update: updateDevice,
    remove: removeDevice,
    getById: getDeviceById,
    find: find
}
