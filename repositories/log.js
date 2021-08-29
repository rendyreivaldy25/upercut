const moment = require('moment');

const logData = function(data) {
    console.log(`========= ${moment(new Date())} =========\n${data}`);
}

module.exports = {
    logData
}