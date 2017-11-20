var mongoose = require('mongoose');
const DATABASE_NAME = 'demo-restful-api';
const POST = '27017';

mongoose.connect(`mongodb://localhost:${POST}/${DATABASE_NAME}`, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected DB')
    }
});