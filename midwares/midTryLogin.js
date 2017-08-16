const getNewCookie = require('../webServer/getNewCookie.js')
const cookieIsAble = require('../webServer/CookieisAble.js')
const cookieCheck = require('../javascript/CookieCheck.js')
const USmongo = require('../persistence/USmongo.js')
const myUSmongo = new USmongo()
const fs = require('fs');
const path = require('path')
module.exports = async function (req, res, next) {
    let myCookie = 'feisweb=' + req.cookies.feisweb;
    neauCookies = await myUSmongo.query(myCookie);
    req.neauCookie = neauCookies[0].neauSessionId;
    req.myCookie = myCookie;
    next()
}