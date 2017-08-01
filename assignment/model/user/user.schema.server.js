/**
 * Created by Akshay on 8/5/2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    email : String,
    websites:[{type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"}],
    phone : String,
    isAdmin : Boolean
},{collection:"user"});

module.exports = userSchema;