const getNewCookie = require('../webServer/getNewCookie.js')
const cookieIsAble = require('../webServer/CookieisAble.js')
const cookieCheck = require('../javascript/CookieCheck.js')
const fs = require('fs');
const path = require('path')
module.exports = async function (req, res, next) {
    //用req.cookies来检查数据库
    let flag = await cookieIsAble(req.cookies.feisweb)
    console.log(flag + '--------')
    //检查到了并且可用
    if (flag[0] !== -1) {
        console.log('在中间件中找到了可用neauCookie！！！')
        req.neauCookie = flag[1];
        req.myCookie = 'feisweb=' + req.cookies.feisweb
        //定向为main页面
        res.writeHead(302, {
            'Location': '/main'
        });
        res.end();
    }

    //无可用cookie，绑定新cookie 
    else if (req.url === '/login') {
        console.log('在login页面没有找到可用neauCookie！！！，获取新的neauCookie')
        let cookies = await getNewCookie()
        res.cookie('feisweb', cookies[1])
        req.myCookie = 'feisweb=' + cookies[1];
        req.neauCookie = cookies[0];
        next();
    }

    else if (req.url !== '/login') {
        console.log('没有找到了可用neauCookie！！！，重定向')
        //重定向
        res.writeHead(302, {
            'Location': '/login'
        });
        res.end();
    }

}   