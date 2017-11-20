var express = require('express');
var router = express.Router();
var manageController = require('./../controllers/manage.controller');
var schedule = require('node-schedule');
var Information = require('./../models/information.model');
var EmailService = require('./../services/email.service');
// var auth = require('./../middleware/jwt-parser');
var account = require('./../constant').ACCOUNT;
var tophone = require('./../constant').PHONE;
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: account.apiKey,
    apiSecret: account.apiSecret,
  }, {debug: true});


router.get('/', ensureAuthenticated, function (req, res) {
    res.render('manage', { title: 'Manage', js: ['xulymanage.js'] });
});
router.post('/add', ensureAuthenticated, addDevice);
router.post('/remove', ensureAuthenticated, removeDevice)
router.put('/', ensureAuthenticated, sendArr)
// router.post('/report',auth.parser(_role.ADMIN), reportDevice);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}
var arr = [];

function sendArr(req, res, next) {
    return res.send(arr);
}
function addDevice(req, res, next) {
    var arrDevices = req.body;
    //console.log(arrDevices);
    function findDevice(device) {
        return device._id === arrDevices._id;
    }
    if (arr.findIndex(findDevice) < 0) {
        arr.push(arrDevices);
        return res.send(arr);
    }
    return res.send("fail");
};
function removeDevice(req, res, next) {
    var arrDevices = req.body;
    function findDevice(device) {
        return device._id === arrDevices._id;
    }
    if (arr.findIndex(findDevice) >= 0) {
        arr.splice(arr.findIndex(findDevice), 1);
        return res.send(arr);
    }
    return res.send("fail");
}

var rule = new schedule.RecurrenceRule();
rule.second = 45;
//   var arrDevices = JSON.parse(req.body.array);

var j = schedule.scheduleJob('abc', rule, function () {
   // console.log(arr);
    if (arr) {
      //  var allTasks = arr.map(device => {
            arr.forEach(device=>{
            manageController.ping(device)
                .then(information => {
                    return manageController.testConnect(information)
                })
                .then(information => {
                    if (information.fail > 0) {
                        var content = information.MAC + " + " + information.IP + " + " + Date(information.date) + ": interrupt - " + information.fail;
                        var text = information.IP+ " - " +information.name+ " -  " +information.fail;
                        EmailService.sendEmail('devicemanageproject1@gmail.com', content);
                            // .then(infor => console.log(infor))
                            // .catch(err => console.log(err));
                        var NUMBER = "84942042419";    
                        nexmo.message.sendSms(
                            NUMBER, tophone.phone1, text, {type: 'unicode'},
                                (err, responseData) => {
                                  if (err) {
                                    console.log("err");
                                  } else {
                                    console.dir("responseData");
                                    // Optional: add socket.io -- will explain later
                                  }
                                }
                            );
                            return Information.create(information);
                    }
                })
                .then(information => {
                    console.log(information)
                })
                .catch(err => console.log(err))
        });
    } else {
        console.log("cancel");
    }
})
module.exports = router;
