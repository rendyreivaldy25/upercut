const moment = require('moment')

const getRandomToken = function(){
    let length = 32;
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const checkLastLoginDateTime = function(stringDate){
    var lastLoginDate = moment(stringDate, 'YYYY-MM-DD HH:mm:ss');
    var timeDateNow = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var dateDiff = moment.duration(timeDateNow.diff(lastLoginDate));
    if( dateDiff.asHours() > 24){
        return {
            status : false,
            message: "Token Expired"
        };
    }
    return {
        status : true,
        message: "Token Valid"
    };
}

module.exports = {
    getRandomToken,
    checkLastLoginDateTime
}