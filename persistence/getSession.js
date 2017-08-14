const userSession = require('../models/userSession.js');

let USmongo = function(){

}

USmongo.prototype.insert=function (sessionId, neauSessionId) {
    let p = new Promise(function (resolve, reject) {
        let userSe = new userSession(
            {
                sessionId: sessionId,
                neauSessionId: neauSessionId,
            }
        );
        userSe.save(function (err, res) {

            if (err) {
                console.log("Error:" + err);
                rejcet(err)
            }
            else {
                console.log("Res:" + res);
                resolve(res);
            }

        });
    })

    return p;
}
USmongo.prototype.del = function (sessionId) {
    let p = new Promise(function (resolve, reject) {
        let whereStr = { sessionId: sessionId }
        userSession.remove(whereStr, function (err, res) {
            if (err) {
                console.log('err: ' + err)
                reject(err);
            }
            else {
                console.log('res: ' + res)
                resolve(res);
            }
        })
    })
    return p;
}
USmongo.prototype.update = function (sessionId, neauSessionId) {
    let p = new Promise(function (resolve, reject) {
        let whereStr = { sessionId: sessionId }
        let updatesStr = {
            neauSessionId: neauSessionId,
        }
        let cond = { upsert: false, multi: true }
        userSession.update(whereStr, updatesStr, cond, function (err, res) {
            if (err) {
                console.log('err' + err);
                reject(err)
            }
            else {
                console.log('res' + res)
                resolve(res);
            }
        })
    })

    return p;
}

module.exports = USmongo;