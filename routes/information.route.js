var express = require('express');
var router = express.Router();
var informationController = require('./../controllers/information.controller');
// var auth = require('./../middleware/jwt-parser');
// var _role = require('./../constant').ROLE;
var moment = require('moment-timezone');

router.get('/',ensureAuthenticated, showPage);
//router.get('/:id',  getInformationById);
router.post('/',ensureAuthenticated,  findInformation);
router.put('/',ensureAuthenticated, createInformation);

function getInformationById(req, res, next) {
    var id = req.params.id;
    informationController.getById(id)
        .then(function (information) {
            res.send(information)
        }).catch(function (err) {
            res.status(404).send(err);
        });
}


function findInformation(req, res, next) {
    var query = req.body;
     query.day1 = moment.tz(query.day1, "Asia/Ho_Chi_Minh").clone().tz("America/Scoresbysund");
     query.day2 = moment.tz(query.day2, "Asia/Ho_Chi_Minh").clone().tz("America/Scoresbysund");
    informationController.find(query)//, currentPage, pageSize)
        .then(function (information) {
            res.send(information)
        }).catch(function (err) {
            res.status(404).send(err);
        });
};

function createInformation(req, res, next) {
    var information = req.body;
    informationController.create(information)
        .then(function (information) {
            res.send(information)
        }).catch(function (err) {
            res.status(404).send(err);
        });
}
function showPage(req, res, next) {
    res.render("information",{ title: 'Information', js: ['xulyinformation.js','filesaver.js'] });
}
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
module.exports = router;