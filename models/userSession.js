const mongoose = require('mongoose')
const db = require('../persistence/db.js')

let Schema = db.Schema

const userSession = new Schema(
    {
        sessionId:String,
        neauSessionId:String,
        stuId:String,
        password:String,
    },{
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
)

module.exports = db.model('userSession',userSession)
