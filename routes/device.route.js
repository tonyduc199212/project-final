var express = require('express');
var router = express.Router();
var deviceController = require('./../controllers/device.controller');
// var auth = require('./../middleware/jwt-parser');
// var _role = require('./../constant').ROLE;
var passport = require('passport');

router.get('/:id',  ensureAuthenticated,getDeviceById);
router.put('/',   ensureAuthenticated,findDevice);
router.post('/:id',  ensureAuthenticated,updateDeviceById);
router.post('/',  ensureAuthenticated,createDevice);
router.delete('/:id',  ensureAuthenticated,removeDeviceById);
router.get('/', ensureAuthenticated, function(req, res){
	res.render('device',{ title: 'Device', js: ['xulydevice.js'] });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


function getDeviceById(req, res, next) {
    var id = req.params.id;
    deviceController.getById(id)
        .then(function (device) {
            res.send(device)
        }).catch(function (err) {
            res.status(404).send(err);
        });
}
function updateDeviceById(req, res, next) {
    var id = req.params.id;
    var modifiedData = req.body;
    deviceController.update(id, modifiedData)
        .then(function (device) {
            res.send(device)
        }).catch(function (err) {
            res.status(404).send(err);
        });
}
function createDevice(req, res, next) {
		var errors = [{
			msg: "Username is not valid",
			param: "username",
		}]
    var device = req.body;
    console.log(device);
    deviceController.create(device)
        .then(device => {
            res.send(device)
        }).catch(function (err) {
            res.status(404).send(err);
        });
}
function removeDeviceById(req, res, next) {
    var id = req.params.id;
    deviceController.remove(id)
        .then(function (device) {
            res.send(device)
        }).catch(function (err) {
            res.status(404).send(err);
        });
};
function findDevice(req, res, next) {
    var query = req.body.query;
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    deviceController.find(query, currentPage, pageSize)
        .then(function (device) {
            res.send(device)
        }).catch(function (err) {
            res.status(404).send(err);
        });
};


module.exports = router;