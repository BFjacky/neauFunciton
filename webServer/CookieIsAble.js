
const USmongo = require('../persistence/USmongo.js')
const myMongo = new USmongo();
const CookieCheck = require('../javascript/CookieCheck.js');
async function checkCookie(sessionId) {
    console.log('here')
    sessionId = 'feisweb=' + sessionId
    let neauSessionObj = await myMongo.query(sessionId);
    let flag = []
    if (neauSessionObj.length !== 0) {
        let neauSessionId = neauSessionObj[0].neauSessionId;
        flag[0] = await CookieCheck(neauSessionId)
        flag[1] = neauSessionId;
        return flag;
    }
    else {
        flag[0] = -1;
        return flag;
    }
}

module.exports = checkCookie