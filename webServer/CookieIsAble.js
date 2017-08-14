
const USmongo = require('../persistence/USmongo.js')
const myMongo = new USmongo();
const CookieCheck = require('../javascript/CookieCheck.js');
async function checkCookie(sessionId) {
    console.log('here')
    sessionId = 'feisweb=' + sessionId
    let neauSessionObj = await myMongo.query(sessionId);
    let neauSessionId = neauSessionObj[0].neauSessionId;
    let flag = []
    flag[0] = await CookieCheck(neauSessionId)
    flag[1] = neauSessionId;
    return flag;
}

module.exports = checkCookie