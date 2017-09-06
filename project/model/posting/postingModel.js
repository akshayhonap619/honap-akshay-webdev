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
postingModel.getallPostings = getallPostings;
postingModel.updatePosting = updatePosting;

postingModel.addApplicant = addApplicant;
postingModel.jobDecision = jobDecision;
module.exports = postingModel;


function updatePosting(userId,posting) {

    return postingModel.update({_id : posting._id},
        {$set : {
            jobTitle : posting.jobTitle,
            company : posting.company,
            location : posting.location,
            date : posting.date,
            jobType : posting.jobType,
            skills : posting.skills,
            description : posting.description
        }}
    )

}

function createPosting(userId,posting){

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

function getallPostings() {
    return postingModel.find();
}

function addApplicant(postingId, userId) {
    return postingModel.findById({_id : postingId})
        .then(function (posting) {

            for(a in posting.applicants){
                if(posting.applicants[a]._id == userId){
                    console.log("exists");
                    return "exists"
                }
            }

            var applicant = {_id : userId , status : "Pending"};
            posting.applicants.push(applicant);

            return posting.save();
        })

}

function jobDecision(userId,postingId,decision) {

    return postingModel.findById(postingId)
        .then(function (posting) {
            var applicant = posting.applicants;

            //console.log(applicant)

            for(a in applicant){
                if(applicant[a]._id == userId){
                    applicant[a].status = decision;
                }
            }

            return posting.save();
        })

}