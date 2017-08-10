/**
 * Created by Akshay on 8/8/2017.
 */
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema(
    {
        name : String,
        description : String,
        website : {type : mongoose.Schema.Types.ObjectId, ref : "websiteModel"},
        created : {type : Date, default : Date.now()},
        widgets : [{type : mongoose.Schema.Types.ObjectId, ref: "widgetModel"}]
    },{collection:"page"});

module.exports = pageSchema;