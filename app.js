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
const auth = require('./midwares/auth.js')
const midTryLogin = require('./midwares/midTryLogin.js')
const myUSmongo = new USmongo()
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', function (req, res) {
    let randomStr = Math.random().toString(36).substring(2, 20);
    // res.cookie('feisweb',randomStr)
    res.send(req.cookies);
})
app.get('/login', auth,
    async function (req, res) {
        if (req.flag) {
            res.writeHead(302, {
                'Location': '/main'
            });
            res.end();
        }
        else {
            fs.readFile(path.join(__dirname, './', 'public', '/html', '/login.html'), (err, data) => {
                if (err) {
                    throw err
                }
                else {
                    res.end(data);
                }
            })
        }
    },
)

app.use('/tryLogin', midTryLogin, function (req, res) {
    let html = '';

    //获取提交的信息
    let formdata = '';
    req.on('data', (chunk) => {
        formdata += chunk;
    })
    req.on('end', async() => {
        let obj = querystring.parse(formdata);
        let stu = new Student();
        stu.stuId = obj.account;
        stu.password = obj.password;
        stu.captcha = obj.captcha;
        stu.cookie = req.neauCookie;
        await myUSmongo.update(req.myCookie,req.neauCookie,stu.stuId,stu.password)
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
    
        if (err) {
            throw err
        }
        else {
            html = data;
        }
        res.end(html);

    })
})

app.get('/main/Sche_Score', auth, function (req, res) {
    if (req.flag) {
        console.log('请求了index页面');
        let html = ''
        fs.readFile(path.join(__dirname, 'public', '/html', '/index.html'), (err, data) => {
        
            if (err) {
                throw err
            }
            else {
                html = data;
            }
            res.end(html);
        })
    }
    else {
        res.writeHead(302, {
            'Location': '/login'
        });
        res.end();
    }
})

app.get('/getSchedule', auth, function (req, res) {
    console.log('服务器接收到了getSchedule 请求')
    runGetSchedule(req.neauCookie).then(function (data) {
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

app.get('/getScore', auth, function (req, res) {
    console.log('服务器接收到了getscore 请求')
    runGetScore(req.neauCookie).then(function (data) {
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

app.get('/quitLogin', auth, async function (req, res) {
    console.log('服务器接收到了quitLogin请求')
    //删除数据库中有关该cookie的信息
    console.log('等待被删除的req.Mycookie', req.myCookie)
    await myUSmongo.del(req.myCookie);
    //重定向login页面
    res.writeHead(302, {
        'Location': '/login'
    });
    res.end();
})
app.listen(80, function () {
    console.log('listening 80...')
})