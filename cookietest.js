const express = require('express')
const cookieParser = require('cookie-parser')

let app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
    console.log('cookies:' , req.cookies);

    console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(3000,function(req,res){
    console.log('running...')
})