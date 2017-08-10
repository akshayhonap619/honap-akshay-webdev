/**
 * Created by Akshay on 8/9/2017.
 */
var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema(
    {
        name : String,
        description : String,
        page : {type : mongoose.Schema.Types.ObjectId, ref : "pageModel"},
        size : String,
        width : String,
        text : String,
        url : String,
        widgetType: String,
        placeholder: {type: String},
        rows: {type: Number},
        formatted: {type: Boolean},
        created : {type : Date, default : Date.now()},
        order : Number
    },{collection : 'widget'})

module.exports = widgetSchema;