const USmongo = require('../persistence/USmongo.js')
const runRequestLoginCond = require('../javascript/runRequestLoginCond.js')
const myMongo = new USmongo();
async function getNewCookie(req, res) {
    let neauSessionId = await runRequestLoginCond();
    let randomStr = Math.random().toString(36).substring(2, 20);
    let sessionId = 'feisweb=' + randomStr
    await myMongo.insert(sessionId, neauSessionId)
    let cookies = [];
    cookies[0] = neauSessionId;
    cookies[1] = randomStr;
    return cookies;
}

module.exports = getNewCookie;