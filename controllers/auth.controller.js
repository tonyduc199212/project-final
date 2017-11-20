var User = require('./../models/user.model');
var jwt = require('jsonwebtoken');
var configJwt = require('./../config/jwt');
var crypto = require('crypto');


function login(username, password) {
    return User.findOne({ _id: username })
        .then((user) => {
            if (user) {                
                password = crypto.pbkdf2Sync(password, user.salt, 1000, 128, 'sha1').toString('base64');
                if (user.password === password) {
                    user = user.toObject();
                    delete user.password;
                    delete user.salt;
                    var payload = {
                        user: user,
                        token: jwt.sign(user, configJwt.secret)
                    };
                    return Promise.resolve(payload);
                } else {
                    return Promise.reject({ message: 'Username or password invalid' });
                }
            } else {
                return Promise.reject({ message: 'Username or password invalid' });
            }
        });
}

function register(user) {
        if (user._id == "" || user.password == "" || user.name == "") {
            return Promise.reject({ message: 'Request is null' });
        } else {
            return User.findOne({ _id: user._id }).then((res) => {
                if (res == null) {
                    user.salt = genRandStr(20);
                    user.password = crypto.pbkdf2Sync(user.password, user.salt, 1000, 128, 'sha1').toString('base64');
                    return User.create(user).then((user) => {
                        user = user.toObject();
                        delete user.password;
                        delete user.salt;
                        return Promise.resolve(user);
                    });
                } else {
                    return Promise.reject({ message: 'User is exists' });
                }
            });
        }
}

function genRandStr(stringLength) {
    return crypto.randomBytes(64)
        .toString('base64')
        .slice(0, stringLength)
        .replace(/\+/g, '0')
        .replace(/\//g, '0');
}

module.exports = {
    login: login,
    register: register
}