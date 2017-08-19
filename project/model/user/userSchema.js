/**
 * Created by Akshay on 8/13/2017.
 */
var mongoose = require('mongoose')


var userSchema = mongoose.Schema(
    {
        username : String,
        password : String,
        role : String,
        email : {type :String, default: ""},
        firstName : {type :String, default: ""},
        lastName : {type :String, default: ""},
        google : {
            id : String,
            token : String
        },

        profile : {
            firstname : {type :String, default: ""},
            lastname : {type :String, default: ""},
            summary : {type :String, default: ""},
            country : {type :String, default: ""},
            zip : {type :String, default: ""},
            skills : {type :String, default: ""},
            workexp : [{
                company : {type :String, default: ""},
                position : {type :String, default: ""},
                description : {type :String, default: ""},
            }],
            project : [{
             name : {type :String, default: ""},
              description : {type :String, default: ""},
            }]
        }
    }, {collection : "projectUser"}
)

module.exports = userSchema;