const repo = require('./mongo');

const authentication = function({ req }){
   const token = req.headers.authorization || '';
   const authenticateResult = repo.authenticateToken(token);
   return { authenticateResult };
}

module.exports = authentication