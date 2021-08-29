const repo = require('./mongo');

const authentication = async function({ req }){
   if(req == undefined || !('headers' in req)){
      return {status: false, message: "Headers not set"};
   }
   const token = req.headers.authorization || '';
   const authenticateResult = await repo.authenticateToken(token);
   return { authenticateResult };
}

module.exports = authentication