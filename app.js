const express = require('express')
const fs = require('fs')
const querystring = require('querystring')
const path = require('path')
const runRequestLoginCond = require('./javascript/runRequestLoginCond.js');
const Student = require('./javascript/Student.js');
const tryLogin = require('./javascript/TryLogin.js');
const runGetScore = require('./javascript/runGetScore.js');
const runGetSchedule = require('./javascript/runGetSchedule.js');
const runCheckCookie = require('./webServer/checkCookie.js')

const app = express();
//新建一个Student对象
let stu = new Student();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send('main html')
})
app.get('/login', function (req, res) {
    //返回首页
    let html = '';

    runRequestLoginCond(stu).then(function (data) {
        //检查浏览器的cookie
        runCheckCookie(req, res, stu.cookie).then(
            function (data) {
                let SchoolCookie = data;
                if (SchoolCookie != '') {
                    console.log('数据库中cookie', SchoolCookie);
                    stu.cookie = SchoolCookie;
                    res.writeHead(302, {
                        'Location': '/main'
                    });
                    res.end();
                }
                else {
                    fs.readFile(path.join(__dirname, 'public', '/html', '/login.html'), (err, data) => {
                        if (err) {
                            throw err
                        }
                        else {
                            html = data;
                        }
                        res.end(html);
                    })
                }
            }
        );
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

app.get('/index', function (req, res) {
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