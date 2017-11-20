var Information = require('./../models/information.model');

function createDevice(information) {
    if (information) {
        return Information.create(information);
    }
    return Promise.reject({ message: 'Information is null' });
};

function getInformationById(id) {
    return Information.findById(id);
}

function find(query) {//, currentPage, pageSize){

    //currentPage = currentPage ||1;
    // pageSize = pageSize || 1000;
    // var query1 = "2017-10-17T00:00:00.00Z";
    // var query2 = "2017-10-18T00:00:00.00Z";


    return Information.find({
        "createdDate": { $gte: query.day1, $lte: query.day2 }
    }
    ).sort({ MAC: 1 });
}


module.exports = {
    create: createDevice,
    getById: getInformationById,
    find: find
}
