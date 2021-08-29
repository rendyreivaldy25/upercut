const log = require('./log');

const errorHandling = (err) => {
    log.logData(err);
    // Otherwise return the original error. The error can also
    // be manipulated in other ways, as long as it's returned.
    return err;
}


module.exports = errorHandling;