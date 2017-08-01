/**
 * Created by Akshay on 8/8/2017.
 */
var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    name : String,
    description : String,
    developerId : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"},
    created : {type : Date, default : Date.now()},
    pages :[{type : mongoose.Schema.Types.ObjectId, ref : 'pageModel'}]
}, {collection : "website"});

module.exports = websiteSchema;

