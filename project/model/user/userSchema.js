/**
 * Created by Akshay on 8/13/2017.
 */
var mongoose = require('mongoose')


var userSchema = mongoose.Schema(
    {
        username : String,
        password : String,
        role : String,
        email : String,
        google : {
            id : String,
            token : String
        }
    }, {collection : "projectUser"}
)

module.exports = userSchema;