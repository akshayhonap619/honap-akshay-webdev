/**
 * Created by Akshay on 8/14/2017.
 */

var mongoose = require('mongoose')

var postingSchema = mongoose.Schema({
    jobTitle : String,
    company : String,
    location : String,
    date : String,
    jobType : String,
    description : String,
    url : String,
    recruiter : {type : mongoose.Schema.Types.ObjectId, ref : "userModel"},
    applicants : [
                    {_id : String,
                     status : String}]
}, {collection: 'posting'})


module.exports = postingSchema;