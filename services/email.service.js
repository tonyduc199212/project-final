var nodemailer = require('nodemailer');
var config = require('./../constant').EMAIL;

function sendEmail(toEmails, content){
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.USER,
                pass: config.PASS
            }
        });
    
        let mailOptions = {
            to: toEmails,
            subject: '[DEVICE MANAGE] BAO CAO THEO NGAY ',
            text: content
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
             //   console.log(error);
                return reject(error);
            }else{
              //  console.log(info);
                return resolve(info);
            }
        });
    });
}

module.exports = {
    sendEmail: sendEmail
};