const express = require('express')
const fs = require('fs')
const querystring = require('querystring')
const path = require('path')
const runRequestLoginCond = require('./javascript/runRequestLoginCond.js');
const Student = require('./javascript/Student.js');
const tryLogin = require('./javascript/TryLogin.js');
const runGetScore = require('./javascript/runGetScore.js');
const runGetSchedule = require('./javascript/runGetSchedule.js');
const USmongo = require('./persistence/USmongo.js')
const cookieParser = require('cookie-parser')
const getNewCookie = require('./webServer/getNewCookie.js')
const cookieIsAble = require('./webServer/CookieisAble.js')
const app = express();
//新建一个Student对象
let stu = new Student();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', function (req, res) {
    let randomStr = Math.random().toString(36).substring(2, 20);
    // res.cookie('feisweb',randomStr)
    res.send(req.cookies);
})
app.get('/login', async function (req, res) {
    //用req.cookies来检查数据库
    let flag = await cookieIsAble(req.cookies.feisweb)
    //检查到了并且可用
    if (flag[0] !== -1) {
        stu.cookie = flag[1];
        res.writeHead(302, {
            'Location': '/main'
        });
        res.end();
    }
    //无可用cookie，绑定新cookie   
    let cookies = await getNewCookie()
    res.cookie('feisweb', cookies[1])
    stu.setCookie(cookies[0]);

    fs.readFile(path.join(__dirname, 'public', '/html', '/login.html'), (err, data) => {
        if (err) {
            throw err
        }
        else {
            res.end(data);
        }
    })
})


app.use('/tryLogin', function (req, res) {
    let html = '';

    //获取提交的信息
    let formdata = '';
    req.on('data', (chunk) => {
        formdata += chunk;
    })
    req.on('end', () => {
        console.log('这里是表单数据', formdata);
        let obj = querystring.parse(formdata);

        stu.stuId = obj.account;
        stu.password = obj.password;
        stu.captcha = obj.captcha;

        //判断提交的信息是否可用
        tryLogin(stu).then(
            function (data) {
                //登陆成功
                console.log('登陆成功了')
                res.writeHead(302, {
                    'Location': '/main'
                });
                res.end();
            },
            function (reason, data) {
                //登陆失败,重定向为首页
                console.log('登陆失败了')
                res.writeHead(302, {
                    'Location': '/login'
                });
                res.end();
            }
        )
    })
})
//

app.get('/main', function (req, res) {
    console.log('请求了main页面');
    let html = ''
    fs.readFile(path.join(__dirname, 'public', '/html', '/main.html'), (err, data) => {
        console.log('正在读取文件')
        if (err) {
            throw err
        }
        else {
            html = data;
        }
        res.end(html);

    })
})

app.get('/main/Sche_Score', function (req, res) {
    console.log('请求了index页面');
    let html = ''
    fs.readFile(path.join(__dirname, 'public', '/html', '/index.html'), (err, data) => {
        console.log('正在读取文件')
        if (err) {
            throw err
        }
        else {
            html = data;
        }
        res.end(html);

    })
})

app.get('/getSchedule', function (req, res) {
    console.log('服务器接收到了getSchedule 请求')
    runGetSchedule(stu).then(function (data) {
        console.log('成功拿到课表数据');
        let StrData = JSON.stringify(data);
        res.writeHead(200, {
            'Content-Type': 'text / json;charset=utf-8',
        })
        res.write(StrData);
        res.end()
    }).catch(err => {
        console.log(err);
    })
})

app.get('/getScore', function (req, res) {
    console.log('服务器接收到了getscore 请求')
    runGetScore(stu).then(function (data) {
        console.log('成功拿到成绩数据')
        let StrData = JSON.stringify(data);
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=utf-8',
        })
        res.write(StrData)
        res.end();
    }).catch(err => {
        console.log(err);
    });
})

app.listen(3000, function () {
    console.log('listening 3000...')
})