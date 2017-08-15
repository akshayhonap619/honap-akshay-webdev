/**
 * Created by Akshay on 8/14/2017.
 */

var mongoose = require('mongoose')

var postingSchema = require('./postingSchema')

var postingModel = mongoose.model('postingModel',postingSchema)

postingModel.createPosting = createPosting;
postingModel.getPostingById = getPostingById;
postingModel.getPostingsForRecruiter = getPostingsForRecruiter;
postingModel.deletePosting = deletePosting;
module.exports = postingModel;


function createPosting(userId,posting){
   // posting.recruiter = userId;
    console.log(posting);
    return postingModel.create(posting);
}

function getPostingById(userId) {

    return postingModel.findById({_id : userId})
}


function getPostingsForRecruiter(userId) {
    console.log("model")
    return postingModel.find({recruiter : userId})
}

function deletePosting(postingId) {
    return postingModel.remove({_id : postingId})
}