var User = require('./../models/user.model');
var crypto = require('crypto');

function searchUsers(req) { // findUsers
    var name = req.body.name;
    if (name == "") {
        return Promise.reject({ message: 'Name is null' });
    } else {
        return User.find({ name: name })
            .then(res => {
                if (res == null) {
                    return Promise.reject({ message: 'Not found' });
                } else {
                    return Promise.resolve(res);
                }
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
};

function getUserById(req) {
    return User.findById(req.params.id)
        .then(res => {
            if (res == null) {
                return Promise.reject({ message: 'Not found' });
            } else {
                return Promise.resolve(res);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function createUser(req) {
    if (req.body._id == "" || req.body.password == "" || req.body.name == "") {
        return Promise.reject({ message: 'Request is null' });
    } else {
        return User.findOne({ _id: req.body._id }).then((res) => {
            if (res == null) {
                var user = req.body;
                user.salt = genRandStr(20);
                user.password = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 128, 'sha1').toString('base64');
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

function getUsers(req) {
    return User.find({});
}

function removeUser(req) { // khong can thiet
    var id = req.params.id;
    return User.findOne({ _id: id }).then((user) => {
        if (user == null) {
            return Promise.reject({ message: 'User is not exists' });
        } else {
            return User.remove(user)
                .then((res) => {
                    return Promise.resolve({ message: 'Delete success' });
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        };
    });
}

function updateUserById(req) {
    //var id = req.params.id;
    var user = req.body;
    if (user.password == "")
        return Promise.reject({ message: 'Password is null' });
    else {
        user.salt = genRandStr(20);
        user.password = crypto.pbkdf2Sync(user.password, user.salt, 1000, 128, 'sha1').toString('base64');
        // if(user.username)
        //     delete user.username;
        // if (user.salt)
        //     delete user.salt;
        if (user.createdDate)
            delete user.createdDate;
        return User.findByIdAndUpdate(user._id, user)
            .then((res) => {
                if (res == null)
                    return Promise.reject({ message: 'Not found' });
                res = res.toObject();
                delete res.password;
                delete res.salt;
                return Promise.resolve(res);
            }).catch((err) => {
                return Promise.reject(err);
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
    searchUsers: searchUsers,
    getUserById: getUserById,
    createUser: createUser,
    getUsers: getUsers,
    removeUser: removeUser,
    updateUserById: updateUserById
}