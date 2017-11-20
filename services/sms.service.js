var request = require('request');
const ROOT_URI = 'http://api.speedsms.vn/index.php/';
const API_KEY = 'NloxYzBXU2J2TW42RXVfanNpNlQ4aGFDdzU3VjZfdjY6';

function sendSms(phone, content, type, sender){
    return new Promise((resolve, reject) => {
        var option = {
            url: `${ROOT_URI}sms/send`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${API_KEY}`
            },
            body: JSON.stringify({
                to: phone,
                content: content,
                sms_type: type,
                sender: sender
            })
        }
        request(option, function(err, res){
            if(err) return reject(err);
            body = JSON.parse(res.body);
            if(body.status === 'error') return reject(body);
            return resolve(body);
        });
    });
}

function userInfo(){
    return new Promise((resolve, reject) => {
        var option = {
            url: `${ROOT_URI}user/info`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${API_KEY}`
            },
        }
        request(option, function(err, res){
            if(err) return reject(err);
            body = JSON.parse(res.body);
            if(body.status === 'error') return reject(body);
            return resolve(body);
        });
    });
}

sendSms(['01646907943'], 'Test Sms service').then(res => {
    console.log(body);
}).catch(err => {
    console.error(err);
});

userInfo().then(res => {
    console.log(body);
}).catch(err => {
    console.error(err);
});

module.exports = {
    sendSms: sendSms,
    userInfo: userInfo
}