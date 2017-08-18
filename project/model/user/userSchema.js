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
        firstName : String,
        lastName : String,
        google : {
            id : String,
            token : String
        },

        profile : {
            firstname : String,
            lastname : String,
            summary : String,
            country : String,
            zip : String,
            workexp : [{
                company : String,
                position : String,
                description : String
            }]
        }
    }, {collection : "projectUser"}
)

module.exports = userSchema;